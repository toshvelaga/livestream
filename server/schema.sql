CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_email character varying(255) NOT NULL UNIQUE,
    user_code integer,
    user_date_created timestamp without time zone,
    user_last_login timestamp without time zone,
    user_active boolean DEFAULT false
);

CREATE TABLE broadcasts (
    youtube_title character varying(255),
    youtube_description text,
    youtube_privacy_policy character varying(255),
    broadcast_time_created timestamp without time zone,
    user_id character varying(255),
    youtube_broadcast_id character varying(255),
    youtube_stream_id character varying(255),
    youtube_destination_url character varying(255),
    facebook_title character varying(255),
    facebook_description text,
    facebook_live_video_id character varying(255),
    facebook_destination_url character varying(255),
    studio_id character varying(255),
    twitch_title character varying(255)
);

