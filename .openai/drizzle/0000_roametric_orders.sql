CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`stripe_session_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`amount_total` integer NOT NULL,
	`currency` text DEFAULT 'eur' NOT NULL,
	`customer_email` text,
	`items_json` text NOT NULL,
	`shipping_method` text NOT NULL,
	`shipping_details_json` text,
	`created_at` integer NOT NULL,
	`paid_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_orders_stripe_session_id` ON `orders` (`stripe_session_id`);
