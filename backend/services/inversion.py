from typing import List, Dict, Any, Optional
import random

SHADOW_GATES = [
    {"gate": 21, "shadow": "Control", "gift": "Authority"},
    {"gate": 31, "shadow": "Arrogance", "gift": "Leadership"},
    {"gate": 38, "shadow": "Struggle", "gift": "Perseverance"},
    {"gate": 58, "shadow": "Dissatisfaction", "gift": "Vitality"},
    {"gate": 19, "shadow": "Dependency", "gift": "Sensitivity"}
]

class InversionService:
    def perform_shadow_inversion(self, input_text: str) -> Dict[str, Any]:
        lower_input = input_text.lower()
        matched_gate = next((g for g in SHADOW_GATES if g["shadow"].lower() in lower_input), None)

        if not matched_gate:
            if "micromanage" in lower_input or "boss" in lower_input:
                matched_gate = next(g for g in SHADOW_GATES if g["gate"] == 21)
            elif "know all" in lower_input or "better than" in lower_input:
                matched_gate = next(g for g in SHADOW_GATES if g["gate"] == 31)
            elif "fight" in lower_input or "hard" in lower_input:
                matched_gate = next(g for g in SHADOW_GATES if g["gate"] == 38)
            elif "unhappy" in lower_input or "joy" in lower_input:
                matched_gate = next(g for g in SHADOW_GATES if g["gate"] == 58)
            elif "need" in lower_input or "cling" in lower_input:
                matched_gate = next(g for g in SHADOW_GATES if g["gate"] == 19)

        if not matched_gate:
            matched_gate = SHADOW_GATES[0] # Default

        protocols = [
            "Stop communication about the issue for 24 hours.",
            f"Write down the objective goal: \"{matched_gate['gift']}\".",
            "State the goal to the other person without mentioning emotions."
        ]

        # Deterministic pseudo-random based on input length for 'systemic_tension'
        # to meet 'deterministic' requirement more strictly than random.randint
        # (Though prompt said 'no LLMs', random is usually fine, but let's be safe)
        seed = sum(ord(c) for c in input_text)
        tension = 70 + (seed % 31)

        return {
            "identified_pattern": f"{matched_gate['shadow']} (Gate {matched_gate['gate']})",
            "systemic_tension": tension,
            "corrective_frequency": matched_gate["gift"],
            "action_protocol": protocols,
            "is_locked": True
        }

inversion_service = InversionService()
