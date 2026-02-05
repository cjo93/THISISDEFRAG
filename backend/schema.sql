
CREATE TABLE "user" (
	id UUID NOT NULL,
	email VARCHAR NOT NULL,
	stripe_customer_id VARCHAR,
	subscription_tier VARCHAR NOT NULL,
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id)
)


;

CREATE TABLE blueprint (
	id UUID NOT NULL,
	user_id UUID NOT NULL,
	data JSON,
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id)
)


;

CREATE TABLE entropyevent (
	id UUID NOT NULL,
	user_id UUID NOT NULL,
	event_type VARCHAR NOT NULL,
	payload JSON,
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id)
)


;

CREATE TABLE experiment (
	id UUID NOT NULL,
	user_id UUID NOT NULL,
	name VARCHAR NOT NULL,
	status VARCHAR NOT NULL,
	results JSON,
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id)
)


;

CREATE TABLE inversionoutcome (
	id UUID NOT NULL,
	user_id UUID NOT NULL,
	input_text VARCHAR NOT NULL,
	shadow_identified VARCHAR NOT NULL,
	protocol_generated JSON,
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id)
)


;

CREATE TABLE lineage (
	id UUID NOT NULL,
	name VARCHAR NOT NULL,
	created_by UUID NOT NULL,
	members JSON,
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(created_by) REFERENCES "user" (id)
)


;

CREATE TABLE sedaevent (
	id UUID NOT NULL,
	user_id UUID NOT NULL,
	score INTEGER NOT NULL,
	tier VARCHAR NOT NULL,
	action VARCHAR NOT NULL,
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id)
)


;

CREATE TABLE subscriptionevent (
	id UUID NOT NULL,
	user_id UUID,
	stripe_event_id VARCHAR NOT NULL,
	event_type VARCHAR NOT NULL,
	status VARCHAR NOT NULL,
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "user" (id),
	UNIQUE (stripe_event_id)
)


;

CREATE TABLE vectorstate (
	id UUID NOT NULL,
	lineage_id UUID NOT NULL,
	vectors JSON,
	voltage INTEGER NOT NULL,
	timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(lineage_id) REFERENCES lineage (id)
)


;
