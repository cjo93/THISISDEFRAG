# 🎯 Onboarding Tooltips Guide

## Overview

Every form field in the DEFRAG onboarding flow now includes educational tooltips that explain why data is collected and how it's protected.

## How It Works

### User Experience

1. User sees a form field with an **ⓘ icon** next to the label
2. Clicking the icon reveals a tooltip with two sections:
   - **Why we need this** - Purpose and value
   - **How it's protected** - Security and privacy details
3. Clicking again (or clicking ✕) closes the tooltip
4. Tooltips smoothly animate in/out with fadeIn effect

### Visual Design

```
┌─────────────────────────────────────┐
│ EMAIL 🔒                          ⓘ │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Why we need this:               │ │
│ │ To save your manual and send    │ │
│ │ you access                      │ │
│ │                                 │ │
│ │ How it's protected:             │ │
│ │ Encrypted, never shared. Used   │ │
│ │ only for account access and     │ │
│ │ manual delivery.                │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [  your@email.com             ]    │
└─────────────────────────────────────┘
```

## Field Information

### 🔒 Email

- **Icon:** 🔒 (Security/Lock)
- **Purpose:** Account access and manual delivery
- **Protection:** AES-256 encryption, zero sharing
- **Collection Stage:** Step 1 only

### 👤 Name

- **Icon:** 👤 (Person)
- **Purpose:** Personalizes manual insights
- **Protection:** Private, not visible to others
- **Collection Stage:** Both steps

### 📅 Birth Date

- **Icon:** 📅 (Calendar)
- **Purpose:** Astrological chart calculations
- **Protection:** Encrypted storage
- **Collection Stage:** Both steps
- **Required:** Yes

### ⏰ Birth Time

- **Icon:** ⏰ (Clock)
- **Purpose:** Rising sign & house placements
- **Protection:** Secure storage, never public
- **Collection Stage:** Both steps
- **Required:** Optional (highly recommended)

### 📍 Birth Place

- **Icon:** 📍 (Location Pin)
- **Purpose:** Location-based calculations
- **Protection:** Encrypted, never shared publicly
- **Collection Stage:** Both steps
- **Required:** Optional

## Implementation Details

### Code Structure

```typescript
const FIELD_INFO = {
  fieldName: {
    why: "User-facing purpose",
    how: "Security and privacy details",
    icon: "emoji"
  }
}
```

### State Management

```typescript
const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
```

### Toggle Function

```typescript
onClick={() => setActiveTooltip(
  activeTooltip === 'fieldName' ? null : 'fieldName'
)}
```

## Design Tokens

### Colors

- Background: `bg-orange-500/10` (10% orange overlay)
- Border: `border-orange-500/30` (30% orange)
- Text Primary: `text-orange-400` (headers)
- Text Secondary: `text-white/70` (body)

### Spacing

- Padding: `p-3` (12px all sides)
- Gap between sections: `space-y-2` (8px)
- Margin from input: `mt-2` (8px)

### Animation

- Name: `fadeIn`
- Duration: `0.2s`
- Easing: `ease-out`

## Benefits

### For Users

1. **Transparency** - No hidden data collection
2. **Trust** - Clear security explanations
3. **Education** - Learn why timing matters in astrology
4. **Control** - Understand what's optional vs required

### For Business

1. **Reduced anxiety** - Users feel safer sharing data
2. **Higher completion rates** - Clear purpose = less abandonment
3. **Trust building** - Demonstrates care and transparency
4. **Differentiation** - Most competitors don't explain data use

## Best Practices

### Writing Tooltip Content

1. **Keep it brief** - 1-2 sentences per section
2. **Use active voice** - "We encrypt your data" not "Your data is encrypted"
3. **Be specific** - "AES-256 encryption" not "strong encryption"
4. **Emphasize value** - What does the user get from sharing this?

### Visual Guidelines

1. **Icons matter** - Use meaningful emojis that reinforce the message
2. **Consistent style** - All tooltips follow same structure
3. **Smooth animations** - No jarring state changes
4. **Mobile-friendly** - Tooltips adapt to small screens

## Testing Checklist

- [ ] All fields have working tooltips
- [ ] Tooltips close when clicking icon again
- [ ] Only one tooltip open at a time
- [ ] Animations are smooth (200ms)
- [ ] Text is readable on all screen sizes
- [ ] Icons display correctly
- [ ] Mobile tooltips don't overflow
- [ ] Keyboard accessible (future improvement)

## Future Enhancements

1. **Progressive disclosure** - Show tooltip automatically on first visit
2. **Learn more links** - Deep dives into astrology/psychology
3. **Video explanations** - Short clips showing what data enables
4. **Localization** - Translate tooltips to multiple languages
5. **A/B testing** - Test different explanation styles

---

**Implementation Status:** ✅ Complete  
**Version:** 1.0.0  
**Last Updated:** January 22, 2026
