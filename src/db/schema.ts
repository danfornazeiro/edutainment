import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// -------------------- USERS --------------------
export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  credit: integer("credit")
    .notNull()
    .$default(() => 0),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// -------------------- COURSES --------------------
export const coursesTable = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("course_name").notNull(),
  description: text("course_description").notNull(),
  slug: text("slug").notNull().unique(), // Slug único para URL
  image: text("image").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
});

// -------------------- VIDEOS --------------------
export const courseVideosTable = pgTable("course_videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => coursesTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  link: text("link").notNull(), // URL completa do YouTube
  videoId: text("video_id").notNull(), // Código do YouTube (para embed)
  order: integer("order")
    .notNull()
    .$default(() => 0),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
});

// reawards

export const RewardStatus = pgEnum("reward_status", [
  "pending",
  "purchased",
  "canceled",
]);

export const rewardsTable = pgTable("rewards", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredCredits: integer("required_credits").notNull(),
  status: RewardStatus("status")
    .notNull()
    .$defaultFn(() => "pending"), // valor default
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
