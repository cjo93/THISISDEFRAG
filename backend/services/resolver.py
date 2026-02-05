from typing import Dict, Any
import hashlib

class ResolverService:
    def resolve_blueprint(self, date_str: str, time_str: str, lat: float, lon: float) -> Dict[str, Any]:
        # Deterministic generation based on inputs
        # This is a placeholder for actual astronomical calculation
        # ensuring compatibility with Python 3.12 where pyswisseph fails.

        input_str = f"{date_str}{time_str}{lat}{lon}"
        seed = int(hashlib.sha256(input_str.encode()).hexdigest(), 16)

        signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                 "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

        planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]

        data = {}
        for i, p in enumerate(planets):
            # Deterministic pseudo-random position
            p_seed = seed + i
            sign_idx = p_seed % 12
            degree = (p_seed % 3000) / 100.0
            data[p] = {
                "lon": (sign_idx * 30) + degree,
                "lat": 0.0, # Simplified
                "sign": signs[sign_idx],
                "signlon": degree
            }

        house_data = {}
        for h in range(1, 13):
            h_key = f"House{h}"
            h_seed = seed + 100 + h
            sign_idx = h_seed % 12
            degree = (h_seed % 3000) / 100.0
            house_data[h_key] = {
                "lon": (sign_idx * 30) + degree,
                "sign": signs[sign_idx]
            }

        return {
            "planets": data,
            "houses": house_data,
            "meta": {
                "date": date_str,
                "time": time_str,
                "lat": lat,
                "lon": lon,
                "method": "deterministic_mock"
            }
        }

resolver_service = ResolverService()
