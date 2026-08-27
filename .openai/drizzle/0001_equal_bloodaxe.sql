ALTER TABLE `orders` ADD `fulfillment_status` text DEFAULT 'open' NOT NULL;
--> statement-breakpoint
ALTER TABLE `orders` ADD `carrier` text;
--> statement-breakpoint
ALTER TABLE `orders` ADD `tracking_number` text;
--> statement-breakpoint
ALTER TABLE `orders` ADD `tracking_url` text;
--> statement-breakpoint
ALTER TABLE `orders` ADD `confirmation_email_status` text DEFAULT 'pending' NOT NULL;
--> statement-breakpoint
ALTER TABLE `orders` ADD `shipping_email_status` text DEFAULT 'pending' NOT NULL;
--> statement-breakpoint
ALTER TABLE `orders` ADD `updated_at` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
CREATE INDEX `idx_orders_created_at` ON `orders` (`created_at`);
