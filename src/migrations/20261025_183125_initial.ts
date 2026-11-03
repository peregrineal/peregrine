import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'sq');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('photo', 'navy', 'split');
  CREATE TYPE "public"."enum_pages_blocks_hero_gradient" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum_pages_blocks_split_content_highlights_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_split_content_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_split_content_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_split_content_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_split_content_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_cards_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_items_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_style" AS ENUM('card', 'line', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_settings_background" AS ENUM('white', 'ivory', 'tint', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_destinations_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_destinations_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_destinations_programme" AS ENUM('university', 'boarding', 'camps');
  CREATE TYPE "public"."enum_pages_blocks_destinations_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_fields_grid_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_timeline_stages_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_timeline_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_timeline_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_timeline_layout" AS ENUM('timeline', 'row');
  CREATE TYPE "public"."enum_pages_blocks_timeline_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_faq_category" AS ENUM('universities', 'boarding', 'camps', 'visas', 'general');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_pages_blocks_cta_highlights_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('navy', 'navy-photo', 'soft');
  CREATE TYPE "public"."enum_pages_blocks_cta_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum_pages_blocks_founder_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum_pages_blocks_feature_groups_groups_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_pages_blocks_feature_groups_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_notice_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum_pages_blocks_booking_settings_background" AS ENUM('tint', 'ivory', 'white');
  CREATE TYPE "public"."enum_pages_blocks_partner_form_settings_background" AS ENUM('ivory', 'white', 'tint');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('photo', 'navy', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_gradient" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_highlights_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_image_side" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_cards_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_items_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_style" AS ENUM('card', 'line', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_settings_background" AS ENUM('white', 'ivory', 'tint', 'navy');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_programme" AS ENUM('university', 'boarding', 'camps');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_fields_grid_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_stages_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_layout" AS ENUM('timeline', 'row');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_category" AS ENUM('universities', 'boarding', 'camps', 'visas', 'general');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_buttons_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_buttons_variant" AS ENUM('navy', 'champagne', 'outline', 'outline-light', 'white', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_highlights_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('navy', 'navy-photo', 'soft');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_settings_background" AS ENUM('white', 'ivory');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_groups_groups_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_groups_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_notice_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_background" AS ENUM('white', 'ivory', 'tint');
  CREATE TYPE "public"."enum__pages_v_blocks_booking_settings_background" AS ENUM('tint', 'ivory', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_partner_form_settings_background" AS ENUM('ivory', 'white', 'tint');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'sq');
  CREATE TYPE "public"."enum_destinations_programmes" AS ENUM('university', 'boarding', 'camps');
  CREATE TYPE "public"."enum_fields_of_study_icon" AS ENUM('graduation-cap', 'school', 'university', 'users', 'user', 'id-card', 'luggage', 'plane', 'globe', 'map-pin', 'compass', 'search', 'file-text', 'file-check', 'file-search', 'pen', 'calendar', 'chat', 'messages', 'book', 'chart', 'languages', 'landmark', 'palette', 'briefcase', 'coins', 'scale', 'cog', 'heart-pulse', 'laptop', 'flask', 'brain', 'sprout', 'palm-tree', 'heart-handshake', 'tent', 'ticket', 'shield-check', 'shield-plus', 'handshake', 'flower', 'sun', 'snowflake', 'trophy', 'atom', 'sparkles', 'home', 'bed', 'route', 'clipboard', 'info');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('universities', 'boarding', 'camps', 'visas', 'general');
  CREATE TYPE "public"."enum_services_key" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_services_form_follow_up_type" AS ENUM('select', 'text');
  CREATE TYPE "public"."enum_services_destination_field" AS ENUM('multi', 'single', 'none');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_partner_enquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('owner', 'editor');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'youtube', 'tiktok');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_nav_items_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_cta_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TYPE "public"."enum_footer_columns_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_hero_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_hero_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_hero_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_hero_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'photo',
  	"image_id" integer,
  	"image_brief" varchar,
  	"gradient" "enum_pages_blocks_hero_gradient" DEFAULT 'medium',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_split_content_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_split_content_highlights_icon"
  );
  
  CREATE TABLE "pages_blocks_split_content_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_split_content_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_split_content_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_split_content_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_split_content_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_split_content_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_brief" varchar,
  	"image_side" "enum_pages_blocks_split_content_image_side" DEFAULT 'right',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_split_content_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"lead" varchar,
  	"body" varchar,
  	"aside" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_service_cards_cards_icon",
  	"link_type" "enum_pages_blocks_service_cards_cards_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_preset_service" "enum_pages_blocks_service_cards_cards_link_preset_service"
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"secondary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_card_grid_items_icon"
  );
  
  CREATE TABLE "pages_blocks_card_grid_items_locales" (
  	"title" varchar,
  	"kicker" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"meta_label" varchar,
  	"meta_value" varchar,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_card_grid_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_card_grid_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_card_grid_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_card_grid_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_card_grid_style" DEFAULT 'card',
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"numbered" boolean,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_card_grid_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_destinations_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_destinations_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_destinations_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_destinations_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_destinations_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"programme" "enum_pages_blocks_destinations_programme" DEFAULT 'university',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_destinations_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_destinations_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar DEFAULT 'Images show illustrative architecture only and do not imply partnership with any institution.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_fields_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_fields_grid_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_fields_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_timeline_stages_icon"
  );
  
  CREATE TABLE "pages_blocks_timeline_stages_locales" (
  	"kicker" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_timeline_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_timeline_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_timeline_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_timeline_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_timeline_layout" DEFAULT 'timeline',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_timeline_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"subheading" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_pages_blocks_faq_category" DEFAULT 'universities',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_cta_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum_pages_blocks_cta_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum_pages_blocks_cta_buttons_preset_service"
  );
  
  CREATE TABLE "pages_blocks_cta_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_cta_highlights_icon"
  );
  
  CREATE TABLE "pages_blocks_cta_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_cta_style" DEFAULT 'navy',
  	"image_id" integer,
  	"image_brief" varchar,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_brief" varchar,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_founder_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_locales" (
  	"eyebrow" varchar,
  	"name" varchar,
  	"role" varchar,
  	"body" varchar,
  	"quote_label" varchar,
  	"quote" varchar,
  	"signature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_groups_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_groups_groups_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_groups_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_groups_groups_icon"
  );
  
  CREATE TABLE "pages_blocks_feature_groups_groups_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numbered" boolean DEFAULT true,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_feature_groups_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_groups_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_notice" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"legal" boolean,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_notice_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_notice_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_booking_settings_background" DEFAULT 'tint',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"contact_heading" varchar DEFAULT 'Contact us',
  	"form_heading" varchar DEFAULT 'Your enquiry',
  	"form_note" varchar DEFAULT 'Fields marked * are required. Please do not send passports or financial records at this stage.',
  	"consent_text" varchar DEFAULT 'I agree that PEREGRINE may use my details to respond to this enquiry, as described in the Privacy Policy.',
  	"success_message" varchar DEFAULT 'Our team will contact you to arrange your consultation.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partner_form_organisation_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partner_form_organisation_types_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partner_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum_pages_blocks_partner_form_settings_background" DEFAULT 'ivory',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partner_form_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Partnership enquiry form',
  	"consent_text" varchar DEFAULT 'I agree to the processing of my personal information for the purpose of responding to this enquiry, in accordance with PEREGRINE''s Privacy Policy.',
  	"success_message" varchar DEFAULT 'Thank you for your interest. We will review your proposal and reply by email.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"fields_of_study_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_hero_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_hero_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_hero_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'photo',
  	"image_id" integer,
  	"image_brief" varchar,
  	"gradient" "enum__pages_v_blocks_hero_gradient" DEFAULT 'medium',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_hero_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_split_content_highlights_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_split_content_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_split_content_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_split_content_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_brief" varchar,
  	"image_side" "enum__pages_v_blocks_split_content_image_side" DEFAULT 'right',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_split_content_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"lead" varchar,
  	"body" varchar,
  	"aside" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_service_cards_cards_icon",
  	"link_type" "enum__pages_v_blocks_service_cards_cards_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_anchor" varchar,
  	"link_url" varchar,
  	"link_preset_service" "enum__pages_v_blocks_service_cards_cards_link_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"secondary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_service_cards_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_card_grid_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_items_locales" (
  	"title" varchar,
  	"kicker" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"meta_label" varchar,
  	"meta_value" varchar,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_card_grid_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_card_grid_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_card_grid_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_card_grid_style" DEFAULT 'card',
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"numbered" boolean,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_card_grid_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_destinations_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_destinations_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_destinations_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_destinations_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"programme" "enum__pages_v_blocks_destinations_programme" DEFAULT 'university',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_destinations_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar DEFAULT 'Images show illustrative architecture only and do not imply partnership with any institution.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_fields_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_fields_grid_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_fields_grid_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_timeline_stages_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_stages_locales" (
  	"kicker" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_timeline_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_timeline_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_timeline_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_timeline_layout" DEFAULT 'timeline',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_timeline_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"subheading" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum__pages_v_blocks_faq_category" DEFAULT 'universities',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_faq_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_cta_buttons_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"variant" "enum__pages_v_blocks_cta_buttons_variant" DEFAULT 'navy',
  	"preset_service" "enum__pages_v_blocks_cta_buttons_preset_service",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_cta_highlights_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_cta_style" DEFAULT 'navy',
  	"image_id" integer,
  	"image_brief" varchar,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_cta_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_brief" varchar,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_founder_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_locales" (
  	"eyebrow" varchar,
  	"name" varchar,
  	"role" varchar,
  	"body" varchar,
  	"quote_label" varchar,
  	"quote" varchar,
  	"signature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups_groups_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_groups_groups_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups_groups_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"numbered" boolean DEFAULT true,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_feature_groups_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_groups_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"closing_heading" varchar,
  	"closing_text" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_notice" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal" boolean,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_notice_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_notice_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_rich_text_settings_background" DEFAULT 'white',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_booking_settings_background" DEFAULT 'tint',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_booking_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"contact_heading" varchar DEFAULT 'Contact us',
  	"form_heading" varchar DEFAULT 'Your enquiry',
  	"form_note" varchar DEFAULT 'Fields marked * are required. Please do not send passports or financial records at this stage.',
  	"consent_text" varchar DEFAULT 'I agree that PEREGRINE may use my details to respond to this enquiry, as described in the Privacy Policy.',
  	"success_message" varchar DEFAULT 'Our team will contact you to arrange your consultation.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_partner_form_organisation_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partner_form_organisation_types_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_partner_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_anchor_id" varchar,
  	"settings_background" "enum__pages_v_blocks_partner_form_settings_background" DEFAULT 'ivory',
  	"settings_hidden" boolean,
  	"settings_pending_approval" boolean,
  	"settings_pending_label" varchar DEFAULT 'Draft, pending approval',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partner_form_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Partnership enquiry form',
  	"consent_text" varchar DEFAULT 'I agree to the processing of my personal information for the purpose of responding to this enquiry, in accordance with PEREGRINE''s Privacy Policy.',
  	"success_message" varchar DEFAULT 'Thank you for your interest. We will review your proposal and reply by email.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"fields_of_study_id" integer
  );
  
  CREATE TABLE "destinations_programmes" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_destinations_programmes",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer,
  	"photo_brief" varchar,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "destinations_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "fields_of_study" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"icon" "enum_fields_of_study_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fields_of_study_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"category" "enum_faqs_category" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_form_follow_up_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_form_follow_up_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"key" "enum_services_key" NOT NULL,
  	"form_follow_up_type" "enum_services_form_follow_up_type" DEFAULT 'select',
  	"destination_field" "enum_services_destination_field" DEFAULT 'multi',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"name" varchar NOT NULL,
  	"short_description" varchar,
  	"form_follow_up_label" varchar,
  	"form_follow_up_placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"licence_source" varchar,
  	"licence_credit" varchar,
  	"licence_licence_confirmed" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"service" varchar NOT NULL,
  	"detail" varchar,
  	"destinations" varchar,
  	"message" varchar,
  	"consent" boolean,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partner_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organisation" varchar NOT NULL,
  	"organisation_type" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"contact" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"website" varchar,
  	"proposal" varchar NOT NULL,
  	"consent" boolean,
  	"status" "enum_partner_enquiries_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"destinations_id" integer,
  	"fields_of_study_id" integer,
  	"faqs_id" integer,
  	"services_id" integer,
  	"media_id" integer,
  	"enquiries_id" integer,
  	"partner_enquiries_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL,
  	"whatsapp_number" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"website" varchar,
  	"address_confirmed" boolean,
  	"seo_defaults_site_name" varchar DEFAULT 'PEREGRINE',
  	"seo_defaults_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"address" varchar,
  	"opening_hours" varchar,
  	"hours_note" varchar,
  	"seo_defaults_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"preset_service" "enum_header_nav_items_preset_service"
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_header_cta_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_anchor" varchar,
  	"cta_url" varchar,
  	"cta_preset_service" "enum_header_cta_preset_service",
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_columns_links_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"preset_service" "enum_footer_columns_links_preset_service"
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar DEFAULT 'Study Abroad · Visa Consultancy',
  	"contact_title" varchar DEFAULT 'Contact us',
  	"bottom_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_highlights" ADD CONSTRAINT "pages_blocks_split_content_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_highlights_locales" ADD CONSTRAINT "pages_blocks_split_content_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_buttons" ADD CONSTRAINT "pages_blocks_split_content_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_buttons" ADD CONSTRAINT "pages_blocks_split_content_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_buttons_locales" ADD CONSTRAINT "pages_blocks_split_content_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_locales" ADD CONSTRAINT "pages_blocks_split_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards_locales" ADD CONSTRAINT "pages_blocks_service_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_locales" ADD CONSTRAINT "pages_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_items" ADD CONSTRAINT "pages_blocks_card_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_items_locales" ADD CONSTRAINT "pages_blocks_card_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_buttons" ADD CONSTRAINT "pages_blocks_card_grid_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_buttons" ADD CONSTRAINT "pages_blocks_card_grid_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_buttons_locales" ADD CONSTRAINT "pages_blocks_card_grid_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_locales" ADD CONSTRAINT "pages_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_buttons" ADD CONSTRAINT "pages_blocks_destinations_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_buttons" ADD CONSTRAINT "pages_blocks_destinations_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_buttons_locales" ADD CONSTRAINT "pages_blocks_destinations_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destinations_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations" ADD CONSTRAINT "pages_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_locales" ADD CONSTRAINT "pages_blocks_destinations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fields_grid" ADD CONSTRAINT "pages_blocks_fields_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fields_grid_locales" ADD CONSTRAINT "pages_blocks_fields_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_fields_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_stages" ADD CONSTRAINT "pages_blocks_timeline_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_stages_locales" ADD CONSTRAINT "pages_blocks_timeline_stages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_buttons" ADD CONSTRAINT "pages_blocks_timeline_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_buttons" ADD CONSTRAINT "pages_blocks_timeline_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_buttons_locales" ADD CONSTRAINT "pages_blocks_timeline_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_locales" ADD CONSTRAINT "pages_blocks_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons_locales" ADD CONSTRAINT "pages_blocks_cta_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_highlights" ADD CONSTRAINT "pages_blocks_cta_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_highlights_locales" ADD CONSTRAINT "pages_blocks_cta_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_locales" ADD CONSTRAINT "pages_blocks_founder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups_groups_items" ADD CONSTRAINT "pages_blocks_feature_groups_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_groups_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups_groups_items_locales" ADD CONSTRAINT "pages_blocks_feature_groups_groups_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_groups_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups_groups" ADD CONSTRAINT "pages_blocks_feature_groups_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups_groups_locales" ADD CONSTRAINT "pages_blocks_feature_groups_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_groups_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups" ADD CONSTRAINT "pages_blocks_feature_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_groups_locales" ADD CONSTRAINT "pages_blocks_feature_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_notice" ADD CONSTRAINT "pages_blocks_notice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_notice_locales" ADD CONSTRAINT "pages_blocks_notice_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_notice"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking" ADD CONSTRAINT "pages_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_locales" ADD CONSTRAINT "pages_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_form_organisation_types" ADD CONSTRAINT "pages_blocks_partner_form_organisation_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partner_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_form_organisation_types_locales" ADD CONSTRAINT "pages_blocks_partner_form_organisation_types_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partner_form_organisation_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_form" ADD CONSTRAINT "pages_blocks_partner_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_form_locales" ADD CONSTRAINT "pages_blocks_partner_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partner_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_fields_of_study_fk" FOREIGN KEY ("fields_of_study_id") REFERENCES "public"."fields_of_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_highlights" ADD CONSTRAINT "_pages_v_blocks_split_content_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_split_content_highlights_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_buttons" ADD CONSTRAINT "_pages_v_blocks_split_content_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_buttons" ADD CONSTRAINT "_pages_v_blocks_split_content_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_split_content_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_locales" ADD CONSTRAINT "_pages_v_blocks_split_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_cards_locales" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_locales" ADD CONSTRAINT "_pages_v_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_items" ADD CONSTRAINT "_pages_v_blocks_card_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_items_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" ADD CONSTRAINT "_pages_v_blocks_card_grid_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" ADD CONSTRAINT "_pages_v_blocks_card_grid_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_buttons" ADD CONSTRAINT "_pages_v_blocks_destinations_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_buttons" ADD CONSTRAINT "_pages_v_blocks_destinations_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_destinations_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destinations_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations" ADD CONSTRAINT "_pages_v_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_locales" ADD CONSTRAINT "_pages_v_blocks_destinations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fields_grid" ADD CONSTRAINT "_pages_v_blocks_fields_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fields_grid_locales" ADD CONSTRAINT "_pages_v_blocks_fields_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_fields_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_stages" ADD CONSTRAINT "_pages_v_blocks_timeline_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_stages_locales" ADD CONSTRAINT "_pages_v_blocks_timeline_stages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_buttons" ADD CONSTRAINT "_pages_v_blocks_timeline_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_buttons" ADD CONSTRAINT "_pages_v_blocks_timeline_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_timeline_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_locales" ADD CONSTRAINT "_pages_v_blocks_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_highlights" ADD CONSTRAINT "_pages_v_blocks_cta_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_cta_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_locales" ADD CONSTRAINT "_pages_v_blocks_founder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups_groups_items" ADD CONSTRAINT "_pages_v_blocks_feature_groups_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_groups_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups_groups_items_locales" ADD CONSTRAINT "_pages_v_blocks_feature_groups_groups_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_groups_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups_groups" ADD CONSTRAINT "_pages_v_blocks_feature_groups_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups_groups_locales" ADD CONSTRAINT "_pages_v_blocks_feature_groups_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_groups_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups" ADD CONSTRAINT "_pages_v_blocks_feature_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_groups_locales" ADD CONSTRAINT "_pages_v_blocks_feature_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_notice" ADD CONSTRAINT "_pages_v_blocks_notice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_notice_locales" ADD CONSTRAINT "_pages_v_blocks_notice_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_notice"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_booking" ADD CONSTRAINT "_pages_v_blocks_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_booking_locales" ADD CONSTRAINT "_pages_v_blocks_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_form_organisation_types" ADD CONSTRAINT "_pages_v_blocks_partner_form_organisation_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partner_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_form_organisation_types_locales" ADD CONSTRAINT "_pages_v_blocks_partner_form_organisation_types_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partner_form_organisation_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_form" ADD CONSTRAINT "_pages_v_blocks_partner_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_form_locales" ADD CONSTRAINT "_pages_v_blocks_partner_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partner_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_fields_of_study_fk" FOREIGN KEY ("fields_of_study_id") REFERENCES "public"."fields_of_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_programmes" ADD CONSTRAINT "destinations_programmes_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations" ADD CONSTRAINT "destinations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations_locales" ADD CONSTRAINT "destinations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fields_of_study_locales" ADD CONSTRAINT "fields_of_study_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fields_of_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_form_follow_up_options" ADD CONSTRAINT "services_form_follow_up_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_form_follow_up_options_locales" ADD CONSTRAINT "services_form_follow_up_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_form_follow_up_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fields_of_study_fk" FOREIGN KEY ("fields_of_study_id") REFERENCES "public"."fields_of_study"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_enquiries_fk" FOREIGN KEY ("partner_enquiries_id") REFERENCES "public"."partner_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_defaults_image_id_media_id_fk" FOREIGN KEY ("seo_defaults_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_buttons_page_idx" ON "pages_blocks_hero_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_buttons_locales_locale_parent_id_unique" ON "pages_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_buttons_locales_parent_id_idx" ON "pages_blocks_hero_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_highlights_order_idx" ON "pages_blocks_split_content_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_highlights_parent_id_idx" ON "pages_blocks_split_content_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_split_content_highlights_locales_locale_parent_" ON "pages_blocks_split_content_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_split_content_highlights_locales_parent_id_idx" ON "pages_blocks_split_content_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_buttons_order_idx" ON "pages_blocks_split_content_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_buttons_parent_id_idx" ON "pages_blocks_split_content_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_buttons_page_idx" ON "pages_blocks_split_content_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_split_content_buttons_locales_locale_parent_id_" ON "pages_blocks_split_content_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_split_content_buttons_locales_parent_id_idx" ON "pages_blocks_split_content_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_order_idx" ON "pages_blocks_split_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_parent_id_idx" ON "pages_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_path_idx" ON "pages_blocks_split_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_content_image_idx" ON "pages_blocks_split_content" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_split_content_locales_locale_parent_id_unique" ON "pages_blocks_split_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_split_content_locales_parent_id_idx" ON "pages_blocks_split_content_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_order_idx" ON "pages_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_cards_parent_id_idx" ON "pages_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_link_link_page_idx" ON "pages_blocks_service_cards_cards" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_cards_locales_locale_parent_id_un" ON "pages_blocks_service_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_locales_parent_id_idx" ON "pages_blocks_service_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_locales_locale_parent_id_unique" ON "pages_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_locales_parent_id_idx" ON "pages_blocks_service_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_items_order_idx" ON "pages_blocks_card_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_items_parent_id_idx" ON "pages_blocks_card_grid_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_items_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_items_locales_parent_id_idx" ON "pages_blocks_card_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_buttons_order_idx" ON "pages_blocks_card_grid_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_buttons_parent_id_idx" ON "pages_blocks_card_grid_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_buttons_page_idx" ON "pages_blocks_card_grid_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_buttons_locales_locale_parent_id_uniq" ON "pages_blocks_card_grid_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_buttons_locales_parent_id_idx" ON "pages_blocks_card_grid_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_locales_parent_id_idx" ON "pages_blocks_card_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_buttons_order_idx" ON "pages_blocks_destinations_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_buttons_parent_id_idx" ON "pages_blocks_destinations_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_buttons_page_idx" ON "pages_blocks_destinations_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_destinations_buttons_locales_locale_parent_id_u" ON "pages_blocks_destinations_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_destinations_buttons_locales_parent_id_idx" ON "pages_blocks_destinations_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_order_idx" ON "pages_blocks_destinations" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_parent_id_idx" ON "pages_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_path_idx" ON "pages_blocks_destinations" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_destinations_locales_locale_parent_id_unique" ON "pages_blocks_destinations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_destinations_locales_parent_id_idx" ON "pages_blocks_destinations_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fields_grid_order_idx" ON "pages_blocks_fields_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_fields_grid_parent_id_idx" ON "pages_blocks_fields_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fields_grid_path_idx" ON "pages_blocks_fields_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_fields_grid_locales_locale_parent_id_unique" ON "pages_blocks_fields_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_fields_grid_locales_parent_id_idx" ON "pages_blocks_fields_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_stages_order_idx" ON "pages_blocks_timeline_stages" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_stages_parent_id_idx" ON "pages_blocks_timeline_stages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_timeline_stages_locales_locale_parent_id_unique" ON "pages_blocks_timeline_stages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_timeline_stages_locales_parent_id_idx" ON "pages_blocks_timeline_stages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_buttons_order_idx" ON "pages_blocks_timeline_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_buttons_parent_id_idx" ON "pages_blocks_timeline_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_buttons_page_idx" ON "pages_blocks_timeline_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_timeline_buttons_locales_locale_parent_id_uniqu" ON "pages_blocks_timeline_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_timeline_buttons_locales_parent_id_idx" ON "pages_blocks_timeline_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_timeline_locales_locale_parent_id_unique" ON "pages_blocks_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_timeline_locales_parent_id_idx" ON "pages_blocks_timeline_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_buttons_page_idx" ON "pages_blocks_cta_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_buttons_locales_locale_parent_id_unique" ON "pages_blocks_cta_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_buttons_locales_parent_id_idx" ON "pages_blocks_cta_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_highlights_order_idx" ON "pages_blocks_cta_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_highlights_parent_id_idx" ON "pages_blocks_cta_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_highlights_locales_locale_parent_id_unique" ON "pages_blocks_cta_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_highlights_locales_parent_id_idx" ON "pages_blocks_cta_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_image_idx" ON "pages_blocks_cta" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_order_idx" ON "pages_blocks_founder" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_parent_id_idx" ON "pages_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_path_idx" ON "pages_blocks_founder" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_image_idx" ON "pages_blocks_founder" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_founder_locales_locale_parent_id_unique" ON "pages_blocks_founder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_founder_locales_parent_id_idx" ON "pages_blocks_founder_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_groups_items_order_idx" ON "pages_blocks_feature_groups_groups_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_groups_groups_items_parent_id_idx" ON "pages_blocks_feature_groups_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_groups_groups_items_locales_locale_pare" ON "pages_blocks_feature_groups_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_groups_items_locales_parent__idx" ON "pages_blocks_feature_groups_groups_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_groups_order_idx" ON "pages_blocks_feature_groups_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_groups_groups_parent_id_idx" ON "pages_blocks_feature_groups_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_groups_groups_locales_locale_parent_id_" ON "pages_blocks_feature_groups_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_groups_locales_parent_id_idx" ON "pages_blocks_feature_groups_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_order_idx" ON "pages_blocks_feature_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_groups_parent_id_idx" ON "pages_blocks_feature_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_path_idx" ON "pages_blocks_feature_groups" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_feature_groups_locales_locale_parent_id_unique" ON "pages_blocks_feature_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_groups_locales_parent_id_idx" ON "pages_blocks_feature_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_notice_order_idx" ON "pages_blocks_notice" USING btree ("_order");
  CREATE INDEX "pages_blocks_notice_parent_id_idx" ON "pages_blocks_notice" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_notice_path_idx" ON "pages_blocks_notice" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_notice_locales_locale_parent_id_unique" ON "pages_blocks_notice_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_notice_locales_parent_id_idx" ON "pages_blocks_notice_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_order_idx" ON "pages_blocks_booking" USING btree ("_order");
  CREATE INDEX "pages_blocks_booking_parent_id_idx" ON "pages_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_path_idx" ON "pages_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_booking_locales_locale_parent_id_unique" ON "pages_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_locales_parent_id_idx" ON "pages_blocks_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_form_organisation_types_order_idx" ON "pages_blocks_partner_form_organisation_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_form_organisation_types_parent_id_idx" ON "pages_blocks_partner_form_organisation_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_partner_form_organisation_types_locales_locale_" ON "pages_blocks_partner_form_organisation_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_partner_form_organisation_types_locales_par_idx" ON "pages_blocks_partner_form_organisation_types_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_form_order_idx" ON "pages_blocks_partner_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_form_parent_id_idx" ON "pages_blocks_partner_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_form_path_idx" ON "pages_blocks_partner_form" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_partner_form_locales_locale_parent_id_unique" ON "pages_blocks_partner_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_partner_form_locales_parent_id_idx" ON "pages_blocks_partner_form_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_fields_of_study_id_idx" ON "pages_rels" USING btree ("fields_of_study_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_page_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_locales_parent_id_idx" ON "_pages_v_blocks_hero_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_highlights_order_idx" ON "_pages_v_blocks_split_content_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_highlights_parent_id_idx" ON "_pages_v_blocks_split_content_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_split_content_highlights_locales_locale_pare" ON "_pages_v_blocks_split_content_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_highlights_locales_parent__idx" ON "_pages_v_blocks_split_content_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_buttons_order_idx" ON "_pages_v_blocks_split_content_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_buttons_parent_id_idx" ON "_pages_v_blocks_split_content_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_buttons_page_idx" ON "_pages_v_blocks_split_content_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_split_content_buttons_locales_locale_parent_" ON "_pages_v_blocks_split_content_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_buttons_locales_parent_id_idx" ON "_pages_v_blocks_split_content_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_order_idx" ON "_pages_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_parent_id_idx" ON "_pages_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_path_idx" ON "_pages_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_content_image_idx" ON "_pages_v_blocks_split_content" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_split_content_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_split_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_locales_parent_id_idx" ON "_pages_v_blocks_split_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_order_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_parent_id_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_link_link_page_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_cards_cards_locales_locale_parent_id" ON "_pages_v_blocks_service_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_cards_locales_parent_id_idx" ON "_pages_v_blocks_service_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_order_idx" ON "_pages_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_parent_id_idx" ON "_pages_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_path_idx" ON "_pages_v_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_cards_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_locales_parent_id_idx" ON "_pages_v_blocks_service_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_items_order_idx" ON "_pages_v_blocks_card_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_items_parent_id_idx" ON "_pages_v_blocks_card_grid_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_card_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_items_locales_parent_id_idx" ON "_pages_v_blocks_card_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_buttons_order_idx" ON "_pages_v_blocks_card_grid_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_buttons_parent_id_idx" ON "_pages_v_blocks_card_grid_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_buttons_page_idx" ON "_pages_v_blocks_card_grid_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_buttons_locales_locale_parent_id_u" ON "_pages_v_blocks_card_grid_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_buttons_locales_parent_id_idx" ON "_pages_v_blocks_card_grid_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_locales_parent_id_idx" ON "_pages_v_blocks_card_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_buttons_order_idx" ON "_pages_v_blocks_destinations_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_buttons_parent_id_idx" ON "_pages_v_blocks_destinations_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_buttons_page_idx" ON "_pages_v_blocks_destinations_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_destinations_buttons_locales_locale_parent_i" ON "_pages_v_blocks_destinations_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_buttons_locales_parent_id_idx" ON "_pages_v_blocks_destinations_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_order_idx" ON "_pages_v_blocks_destinations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_parent_id_idx" ON "_pages_v_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_path_idx" ON "_pages_v_blocks_destinations" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_destinations_locales_locale_parent_id_unique" ON "_pages_v_blocks_destinations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_locales_parent_id_idx" ON "_pages_v_blocks_destinations_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_fields_grid_order_idx" ON "_pages_v_blocks_fields_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_fields_grid_parent_id_idx" ON "_pages_v_blocks_fields_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_fields_grid_path_idx" ON "_pages_v_blocks_fields_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_fields_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_fields_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_fields_grid_locales_parent_id_idx" ON "_pages_v_blocks_fields_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_stages_order_idx" ON "_pages_v_blocks_timeline_stages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_stages_parent_id_idx" ON "_pages_v_blocks_timeline_stages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_timeline_stages_locales_locale_parent_id_uni" ON "_pages_v_blocks_timeline_stages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_stages_locales_parent_id_idx" ON "_pages_v_blocks_timeline_stages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_buttons_order_idx" ON "_pages_v_blocks_timeline_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_buttons_parent_id_idx" ON "_pages_v_blocks_timeline_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_buttons_page_idx" ON "_pages_v_blocks_timeline_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_timeline_buttons_locales_locale_parent_id_un" ON "_pages_v_blocks_timeline_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_buttons_locales_parent_id_idx" ON "_pages_v_blocks_timeline_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_timeline_locales_locale_parent_id_unique" ON "_pages_v_blocks_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_locales_parent_id_idx" ON "_pages_v_blocks_timeline_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_buttons_order_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_buttons_parent_id_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_buttons_page_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_buttons_locales_parent_id_idx" ON "_pages_v_blocks_cta_buttons_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_highlights_order_idx" ON "_pages_v_blocks_cta_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_highlights_parent_id_idx" ON "_pages_v_blocks_cta_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_highlights_locales_locale_parent_id_uniq" ON "_pages_v_blocks_cta_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_highlights_locales_parent_id_idx" ON "_pages_v_blocks_cta_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_image_idx" ON "_pages_v_blocks_cta" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_order_idx" ON "_pages_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_parent_id_idx" ON "_pages_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_path_idx" ON "_pages_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_image_idx" ON "_pages_v_blocks_founder" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_founder_locales_locale_parent_id_unique" ON "_pages_v_blocks_founder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_locales_parent_id_idx" ON "_pages_v_blocks_founder_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_items_order_idx" ON "_pages_v_blocks_feature_groups_groups_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_items_parent_id_idx" ON "_pages_v_blocks_feature_groups_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_groups_groups_items_locales_locale_p" ON "_pages_v_blocks_feature_groups_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_items_locales_pare_idx" ON "_pages_v_blocks_feature_groups_groups_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_order_idx" ON "_pages_v_blocks_feature_groups_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_parent_id_idx" ON "_pages_v_blocks_feature_groups_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_groups_groups_locales_locale_parent_" ON "_pages_v_blocks_feature_groups_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_groups_locales_parent_id_idx" ON "_pages_v_blocks_feature_groups_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_order_idx" ON "_pages_v_blocks_feature_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_groups_parent_id_idx" ON "_pages_v_blocks_feature_groups" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_path_idx" ON "_pages_v_blocks_feature_groups" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_groups_locales_locale_parent_id_uniq" ON "_pages_v_blocks_feature_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_groups_locales_parent_id_idx" ON "_pages_v_blocks_feature_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_notice_order_idx" ON "_pages_v_blocks_notice" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_notice_parent_id_idx" ON "_pages_v_blocks_notice" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_notice_path_idx" ON "_pages_v_blocks_notice" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_notice_locales_locale_parent_id_unique" ON "_pages_v_blocks_notice_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_notice_locales_parent_id_idx" ON "_pages_v_blocks_notice_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_order_idx" ON "_pages_v_blocks_booking" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_booking_parent_id_idx" ON "_pages_v_blocks_booking" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_path_idx" ON "_pages_v_blocks_booking" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_booking_locales_locale_parent_id_unique" ON "_pages_v_blocks_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_booking_locales_parent_id_idx" ON "_pages_v_blocks_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_form_organisation_types_order_idx" ON "_pages_v_blocks_partner_form_organisation_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_form_organisation_types_parent_id_idx" ON "_pages_v_blocks_partner_form_organisation_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_partner_form_organisation_types_locales_loca" ON "_pages_v_blocks_partner_form_organisation_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_form_organisation_types_locales__idx" ON "_pages_v_blocks_partner_form_organisation_types_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_form_order_idx" ON "_pages_v_blocks_partner_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_form_parent_id_idx" ON "_pages_v_blocks_partner_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_form_path_idx" ON "_pages_v_blocks_partner_form" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_partner_form_locales_locale_parent_id_unique" ON "_pages_v_blocks_partner_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_form_locales_parent_id_idx" ON "_pages_v_blocks_partner_form_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_fields_of_study_id_idx" ON "_pages_v_rels" USING btree ("fields_of_study_id");
  CREATE INDEX "destinations_programmes_order_idx" ON "destinations_programmes" USING btree ("order");
  CREATE INDEX "destinations_programmes_parent_idx" ON "destinations_programmes" USING btree ("parent_id");
  CREATE INDEX "destinations__order_idx" ON "destinations" USING btree ("_order");
  CREATE INDEX "destinations_image_idx" ON "destinations" USING btree ("image_id");
  CREATE INDEX "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE UNIQUE INDEX "destinations_locales_locale_parent_id_unique" ON "destinations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "destinations_locales_parent_id_idx" ON "destinations_locales" USING btree ("_parent_id");
  CREATE INDEX "fields_of_study__order_idx" ON "fields_of_study" USING btree ("_order");
  CREATE INDEX "fields_of_study_updated_at_idx" ON "fields_of_study" USING btree ("updated_at");
  CREATE INDEX "fields_of_study_created_at_idx" ON "fields_of_study" USING btree ("created_at");
  CREATE UNIQUE INDEX "fields_of_study_locales_locale_parent_id_unique" ON "fields_of_study_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fields_of_study_locales_parent_id_idx" ON "fields_of_study_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs__order_idx" ON "faqs" USING btree ("_order");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "services_form_follow_up_options_order_idx" ON "services_form_follow_up_options" USING btree ("_order");
  CREATE INDEX "services_form_follow_up_options_parent_id_idx" ON "services_form_follow_up_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_form_follow_up_options_locales_locale_parent_id_uni" ON "services_form_follow_up_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_form_follow_up_options_locales_parent_id_idx" ON "services_form_follow_up_options_locales" USING btree ("_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE UNIQUE INDEX "services_key_idx" ON "services" USING btree ("key");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "partner_enquiries_updated_at_idx" ON "partner_enquiries" USING btree ("updated_at");
  CREATE INDEX "partner_enquiries_created_at_idx" ON "partner_enquiries" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX "payload_locked_documents_rels_fields_of_study_id_idx" ON "payload_locked_documents_rels" USING btree ("fields_of_study_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_partner_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_defaults_seo_defaults_image_idx" ON "site_settings" USING btree ("seo_defaults_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_page_idx" ON "header_nav_items" USING btree ("page_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_locales_parent_id_idx" ON "header_nav_items_locales" USING btree ("_parent_id");
  CREATE INDEX "header_cta_cta_page_idx" ON "header" USING btree ("cta_page_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_locales_parent_id_idx" ON "header_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_page_idx" ON "footer_columns_links" USING btree ("page_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_locales_parent_id_idx" ON "footer_columns_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_locales_parent_id_idx" ON "footer_columns_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_split_content_highlights" CASCADE;
  DROP TABLE "pages_blocks_split_content_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_split_content_buttons" CASCADE;
  DROP TABLE "pages_blocks_split_content_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_split_content" CASCADE;
  DROP TABLE "pages_blocks_split_content_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_items" CASCADE;
  DROP TABLE "pages_blocks_card_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_buttons" CASCADE;
  DROP TABLE "pages_blocks_card_grid_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_card_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_destinations_buttons" CASCADE;
  DROP TABLE "pages_blocks_destinations_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_destinations" CASCADE;
  DROP TABLE "pages_blocks_destinations_locales" CASCADE;
  DROP TABLE "pages_blocks_fields_grid" CASCADE;
  DROP TABLE "pages_blocks_fields_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline_stages" CASCADE;
  DROP TABLE "pages_blocks_timeline_stages_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline_buttons" CASCADE;
  DROP TABLE "pages_blocks_timeline_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_timeline_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_highlights" CASCADE;
  DROP TABLE "pages_blocks_cta_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_founder" CASCADE;
  DROP TABLE "pages_blocks_founder_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_groups_groups_items" CASCADE;
  DROP TABLE "pages_blocks_feature_groups_groups_items_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_groups_groups" CASCADE;
  DROP TABLE "pages_blocks_feature_groups_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_groups" CASCADE;
  DROP TABLE "pages_blocks_feature_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_notice" CASCADE;
  DROP TABLE "pages_blocks_notice_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_booking" CASCADE;
  DROP TABLE "pages_blocks_booking_locales" CASCADE;
  DROP TABLE "pages_blocks_partner_form_organisation_types" CASCADE;
  DROP TABLE "pages_blocks_partner_form_organisation_types_locales" CASCADE;
  DROP TABLE "pages_blocks_partner_form" CASCADE;
  DROP TABLE "pages_blocks_partner_form_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_fields_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_fields_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_stages" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_stages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_founder" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups_groups_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups_groups_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_notice" CASCADE;
  DROP TABLE "_pages_v_blocks_notice_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_booking" CASCADE;
  DROP TABLE "_pages_v_blocks_booking_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_form_organisation_types" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_form_organisation_types_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_form" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_form_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "destinations_programmes" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "destinations_locales" CASCADE;
  DROP TABLE "fields_of_study" CASCADE;
  DROP TABLE "fields_of_study_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "services_form_follow_up_options" CASCADE;
  DROP TABLE "services_form_follow_up_options_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "partner_enquiries" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_gradient";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_background";
  DROP TYPE "public"."enum_pages_blocks_split_content_highlights_icon";
  DROP TYPE "public"."enum_pages_blocks_split_content_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_split_content_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_split_content_image_side";
  DROP TYPE "public"."enum_pages_blocks_split_content_settings_background";
  DROP TYPE "public"."enum_pages_blocks_service_cards_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_service_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service";
  DROP TYPE "public"."enum_pages_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_card_grid_style";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_card_grid_settings_background";
  DROP TYPE "public"."enum_pages_blocks_destinations_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_destinations_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_destinations_programme";
  DROP TYPE "public"."enum_pages_blocks_destinations_settings_background";
  DROP TYPE "public"."enum_pages_blocks_fields_grid_settings_background";
  DROP TYPE "public"."enum_pages_blocks_timeline_stages_icon";
  DROP TYPE "public"."enum_pages_blocks_timeline_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_timeline_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_timeline_layout";
  DROP TYPE "public"."enum_pages_blocks_timeline_settings_background";
  DROP TYPE "public"."enum_pages_blocks_faq_category";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_background";
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_preset_service";
  DROP TYPE "public"."enum_pages_blocks_cta_highlights_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  DROP TYPE "public"."enum_pages_blocks_cta_settings_background";
  DROP TYPE "public"."enum_pages_blocks_founder_settings_background";
  DROP TYPE "public"."enum_pages_blocks_feature_groups_groups_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_groups_settings_background";
  DROP TYPE "public"."enum_pages_blocks_notice_settings_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_pages_blocks_booking_settings_background";
  DROP TYPE "public"."enum_pages_blocks_partner_form_settings_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_gradient";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_highlights_icon";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_style";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_programme";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_fields_grid_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_stages_icon";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_category";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service";
  DROP TYPE "public"."enum__pages_v_blocks_cta_highlights_icon";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_founder_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_groups_groups_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_groups_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_notice_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_booking_settings_background";
  DROP TYPE "public"."enum__pages_v_blocks_partner_form_settings_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_destinations_programmes";
  DROP TYPE "public"."enum_fields_of_study_icon";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_services_key";
  DROP TYPE "public"."enum_services_form_follow_up_type";
  DROP TYPE "public"."enum_services_destination_field";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_partner_enquiries_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_preset_service";
  DROP TYPE "public"."enum_header_cta_type";
  DROP TYPE "public"."enum_header_cta_preset_service";
  DROP TYPE "public"."enum_footer_columns_links_type";
  DROP TYPE "public"."enum_footer_columns_links_preset_service";`)
}
