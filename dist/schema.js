"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuizResultsTable = exports.quizAnswersTable = exports.quizQuestionsTable = exports.quizzesTable = exports.userRewardsTable = exports.rewardsTable = exports.RewardStatus = exports.courseVideosTable = exports.coursesTable = exports.verificationTable = exports.accountTable = exports.sessionTable = exports.userTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
// -------------------- USERS --------------------
exports.userTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    credit: (0, pg_core_1.integer)("credit")
        .notNull()
        .$default(function () { return 0; }),
    emailVerified: (0, pg_core_1.boolean)("email_verified")
        .notNull()
        .$defaultFn(function () { return false; }),
    image: (0, pg_core_1.text)("image"),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .notNull()
        .$defaultFn(function () { return new Date(); }),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .notNull()
        .$defaultFn(function () { return new Date(); }),
});
exports.sessionTable = (0, pg_core_1.pgTable)("session", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(function () { return exports.userTable.id; }, { onDelete: "cascade" }),
    token: (0, pg_core_1.text)("token").notNull().unique(),
    expiresAt: (0, pg_core_1.timestamp)("expires_at").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull(),
    ipAddress: (0, pg_core_1.text)("ip_address"),
    userAgent: (0, pg_core_1.text)("user_agent"),
});
exports.accountTable = (0, pg_core_1.pgTable)("account", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(function () { return exports.userTable.id; }, { onDelete: "cascade" }),
    accountId: (0, pg_core_1.text)("account_id").notNull(),
    providerId: (0, pg_core_1.text)("provider_id").notNull(),
    accessToken: (0, pg_core_1.text)("access_token"),
    refreshToken: (0, pg_core_1.text)("refresh_token"),
    idToken: (0, pg_core_1.text)("id_token"),
    accessTokenExpiresAt: (0, pg_core_1.timestamp)("access_token_expires_at"),
    refreshTokenExpiresAt: (0, pg_core_1.timestamp)("refresh_token_expires_at"),
    scope: (0, pg_core_1.text)("scope"),
    password: (0, pg_core_1.text)("password"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull(),
});
exports.verificationTable = (0, pg_core_1.pgTable)("verification", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    value: (0, pg_core_1.text)("value").notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expires_at").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").$defaultFn(function () { return new Date(); }),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").$defaultFn(function () { return new Date(); }),
});
// -------------------- COURSES --------------------
exports.coursesTable = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)("course_name").notNull(),
    description: (0, pg_core_1.text)("course_description").notNull(),
    slug: (0, pg_core_1.text)("slug").notNull().unique(),
    image: (0, pg_core_1.text)("image").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").$defaultFn(function () { return new Date(); }),
});
// -------------------- VIDEOS --------------------
exports.courseVideosTable = (0, pg_core_1.pgTable)("course_videos", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    courseId: (0, pg_core_1.uuid)("course_id")
        .notNull()
        .references(function () { return exports.coursesTable.id; }, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    link: (0, pg_core_1.text)("link").notNull(),
    videoId: (0, pg_core_1.text)("video_id").notNull(),
    order: (0, pg_core_1.integer)("order")
        .notNull()
        .$default(function () { return 0; }),
    createdAt: (0, pg_core_1.timestamp)("created_at").$defaultFn(function () { return new Date(); }),
});
// -------------------- REWARDS --------------------
exports.RewardStatus = (0, pg_core_1.pgEnum)("reward_status", [
    "pending",
    "purchased",
    "canceled",
]);
exports.rewardsTable = (0, pg_core_1.pgTable)("rewards", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    requiredCredits: (0, pg_core_1.integer)("required_credits").notNull(),
    status: (0, exports.RewardStatus)("status").notNull().default("pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.userRewardsTable = (0, pg_core_1.pgTable)("user_rewards", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(function () { return exports.userTable.id; }, { onDelete: "cascade" }),
    rewardId: (0, pg_core_1.uuid)("reward_id")
        .notNull()
        .references(function () { return exports.rewardsTable.id; }, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
// -------------------- QUIZZES --------------------
exports.quizzesTable = (0, pg_core_1.pgTable)("quizzes", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    courseId: (0, pg_core_1.uuid)("course_id")
        .notNull()
        .references(function () { return exports.coursesTable.id; }, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// -------------------- QUIZ QUESTIONS --------------------
exports.quizQuestionsTable = (0, pg_core_1.pgTable)("quiz_questions", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    quizId: (0, pg_core_1.uuid)("quiz_id")
        .notNull()
        .references(function () { return exports.quizzesTable.id; }, { onDelete: "cascade" }),
    question: (0, pg_core_1.text)("question").notNull(),
    order: (0, pg_core_1.integer)("order").default(0),
});
// -------------------- QUIZ ANSWERS --------------------
exports.quizAnswersTable = (0, pg_core_1.pgTable)("quiz_answers", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    questionId: (0, pg_core_1.uuid)("question_id")
        .notNull()
        .references(function () { return exports.quizQuestionsTable.id; }, { onDelete: "cascade" }),
    answer: (0, pg_core_1.text)("answer").notNull(),
    isCorrect: (0, pg_core_1.boolean)("is_correct").default(false),
});
// -------------------- USER QUIZ RESULTS --------------------
exports.userQuizResultsTable = (0, pg_core_1.pgTable)("user_quiz_results", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(function () { return exports.userTable.id; }, { onDelete: "cascade" }),
    quizId: (0, pg_core_1.uuid)("quiz_id")
        .notNull()
        .references(function () { return exports.quizzesTable.id; }, { onDelete: "cascade" }),
    score: (0, pg_core_1.integer)("score").notNull(),
    completedAt: (0, pg_core_1.timestamp)("completed_at").defaultNow(),
});
