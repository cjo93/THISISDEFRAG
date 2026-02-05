from fastapi import APIRouter, Header, Request, HTTPException, Depends
from backend.config import settings
import stripe
from backend.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models import SubscriptionEvent, User
from sqlmodel import select

stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()

@router.post("/checkout")
async def create_checkout_session(tier: str = "Pro"):
    # Create checkout session
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'Defrag {tier} Subscription',
                    },
                    'unit_amount': 2000 if tier == "Pro" else 10000, # Mock prices
                    'recurring': {'interval': 'month'},
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url='https://defrag.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='https://defrag.app/cancel',
        )
        return {"sessionId": session.id, "url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None), session: AsyncSession = Depends(get_session)):
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event['type'] in ['checkout.session.completed', 'customer.subscription.updated', 'customer.subscription.deleted']:
        # Log event
        sub_event = SubscriptionEvent(
            stripe_event_id=event['id'],
            event_type=event['type'],
            status="processed"
        )
        session.add(sub_event)

        # Update User subscription logic would go here
        # user = session.exec(select(User).where(User.stripe_customer_id == ...)).first()
        # if user: ...

        await session.commit()

    return {"status": "success"}
