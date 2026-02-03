export const KNOWLEDGE_BASE = {
    "VERSION": "2.0.0",
    "META": {
        "description": "The unified source of truth for DEFRAG OS.",
        "modalities": ["Human Design", "Gene Keys", "I-Ching", "Penta", "Astrology"]
    },
    "HEXAGRAM_MATRIX": {
        "TEMPLATE": {
            "id": "Integer (1-64)",
            "label": "String (e.g., 'The Originator')",
            "mechanics": {
                "center": "String (e.g., 'G_Center')",
                "circuit": "String (e.g., 'Individual')",
                "physiology": "String (e.g., 'Liver')"
            },
            "frequencies": {
                "shadow": "String (e.g., 'Entropy')",
                "gift": "String (e.g., 'Freshness')",
                "siddhi": "String (e.g., 'Beauty')"
            },
            "inversion_protocol": {
                "trigger": "String (The Shadow sensation)",
                "pivot": "String (The specific action to shift state)",
                "resolution": "String (The resulting Gift state)"
            }
        },
        "DATA": {
            "1": {
                "id": 1,
                "label": "The Originator",
                "mechanics": { "center": "G_Center", "circuit": "Individual", "physiology": "Liver" },
                "frequencies": { "shadow": "Entropy", "gift": "Freshness", "siddhi": "Beauty" },
                "inversion_protocol": {
                    "trigger": "Numbness/Creative Block",
                    "pivot": "Embrace the void; do not force output.",
                    "resolution": "Fresh creative impulse arises naturally."
                }
            },
            "2": {
                "id": 2,
                "label": "The Compass",
                "mechanics": { "center": "G_Center", "circuit": "Individual", "physiology": "Liver" },
                "frequencies": { "shadow": "Dislocation", "gift": "Orientation", "siddhi": "Unity" },
                "inversion_protocol": {
                    "trigger": "Feeling lost/directionless",
                    "pivot": "Surrender to the vehicle's magnetic pull.",
                    "resolution": "Perfect alignment with trajectory."
                }
            }
            // Gate definitions would continue here 3-64
        }
    },
    "PENTA_MATRIX": {
        "DESCRIPTION": "Group dynamics logic for 3-5 people. Overrides individual psychology.",
        "ZONES": {
            "FLOW": {
                "gates": [15, 5],
                "function": "Rhythm & Culture",
                "shadow_effect": "Chaos & Disconnection"
            },
            "CAPACITY": {
                "gates": [14, 2],
                "function": "Resources & Funding",
                "shadow_effect": "Bankruptcy & Exhaustion"
            },
            "VISION": {
                "gates": [46, 29],
                "function": "Commitment & Implementation",
                "shadow_effect": "Flaking & Incompletion"
            },
            "DEMONSTRATION": {
                "gates": [8, 1],
                "function": "Public Face & Example",
                "shadow_effect": "Irrelevance & Invisibility"
            },
            "ADMINISTRATION": {
                "gates": [31, 7],
                "function": "Leadership & Planning",
                "shadow_effect": "Anarchy & Aimlessness"
            },
            "OVERSEEING": {
                "gates": [33, 13],
                "function": "History & Memory",
                "shadow_effect": "Repetition of Errors"
            }
        }
    },
    "PLANETARY_WEIGHTS": {
        "Sun": { "weight": 0.70, "role": "Life's Work" },
        "Earth": { "weight": 0.70, "role": "Evolution" },
        "Moon": { "weight": 0.60, "role": "Driving Force" },
        "North_Node": { "weight": 0.50, "role": "Future Trajectory" },
        "South_Node": { "weight": 0.50, "role": "Past Legacy" },
        "Mercury": { "weight": 0.40, "role": "Communication Filter" },
        "Venus": { "weight": 0.40, "role": "Relational Values" },
        "Mars": { "weight": 0.40, "role": "Core Wound/Drive" },
        "Jupiter": { "weight": 0.30, "role": "Expansion Law" },
        "Saturn": { "weight": 0.30, "role": "Restriction/Discipline" }
    }
};
