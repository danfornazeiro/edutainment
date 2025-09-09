"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("@/db");
var schema_1 = require("./schema");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var quiz, q1, q2, q3, q4, q5, q6, q7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db
                        .insert(schema_1.quizzesTable)
                        .values({
                        courseId: "2b60df47-4e63-4174-8c5e-b86334dd0a9a",
                        title: "Quiz de Educação Financeira - Curso 1",
                    })
                        .returning()];
                case 1:
                    quiz = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Qual o percentual de famílias brasileiras endividadas, segundo estudo citado?",
                        })
                            .returning()];
                case 2:
                    q1 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            { questionId: q1.id, answer: "30%", isCorrect: false },
                            { questionId: q1.id, answer: "50%", isCorrect: false },
                            { questionId: q1.id, answer: "77%", isCorrect: true },
                        ])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Qual a ideia principal da educação financeira?",
                        })
                            .returning()];
                case 4:
                    q2 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            {
                                questionId: q2.id,
                                answer: "Gastar todo seu dinheiro de uma vez",
                                isCorrect: false,
                            },
                            {
                                questionId: q2.id,
                                answer: "Saber em que gastar e o que economizar",
                                isCorrect: true,
                            },
                            {
                                questionId: q2.id,
                                answer: "Comprar o que quiser sem pensar",
                                isCorrect: false,
                            },
                            { questionId: q2.id, answer: "Nunca guardar dinheiro", isCorrect: false },
                        ])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "O que significa 'consumo consciente'?",
                        })
                            .returning()];
                case 6:
                    q3 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            {
                                questionId: q3.id,
                                answer: "Comprar coisas que te deixam feliz por algum minuto",
                                isCorrect: false,
                            },
                            {
                                questionId: q3.id,
                                answer: "Pensar bem no que você compra",
                                isCorrect: true,
                            },
                            {
                                questionId: q3.id,
                                answer: "Gastar dinheiro com coisas que você não precisa",
                                isCorrect: false,
                            },
                            { questionId: q3.id, answer: "Nunca comprar nada novo", isCorrect: false },
                        ])];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Qual é um bom hábito para evitar estar sempre sem dinheiro e precisar pagar contas atrasadas?",
                        })
                            .returning()];
                case 8:
                    q4 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            {
                                questionId: q4.id,
                                answer: "Gastar todo o dinheiro que você ganha todo mês",
                                isCorrect: false,
                            },
                            {
                                questionId: q4.id,
                                answer: "Deixar sempre pendente os amigos pagarem suas dívidas",
                                isCorrect: false,
                            },
                            {
                                questionId: q4.id,
                                answer: "Economizar uma pequena parte da renda todo mês",
                                isCorrect: true,
                            },
                            {
                                questionId: q4.id,
                                answer: "Usar cartão de crédito para comprar e economizar",
                                isCorrect: false,
                            },
                        ])];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Depois de um ano, quem tinha dinheiro economizado está em uma melhor situação financeira?",
                        })
                            .returning()];
                case 10:
                    q5 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            {
                                questionId: q5.id,
                                answer: "William, porque gastou tudo e aproveitou o dinheiro",
                                isCorrect: false,
                            },
                            {
                                questionId: q5.id,
                                answer: "Pedro, porque economizou parte da renda todo mês",
                                isCorrect: true,
                            },
                            {
                                questionId: q5.id,
                                answer: "Nenhum dos dois, ambos têm dívidas guardadas",
                                isCorrect: false,
                            },
                        ])];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Qual a principal medida para investir seu dinheiro?",
                        })
                            .returning()];
                case 12:
                    q6 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            {
                                questionId: q6.id,
                                answer: "Parar de fazer muita pesquisa antes de comprar",
                                isCorrect: false,
                            },
                            {
                                questionId: q6.id,
                                answer: "Não gastar com itens desnecessários e economizar a longo prazo",
                                isCorrect: true,
                            },
                            {
                                questionId: q6.id,
                                answer: "Comprar muitas coisas novas sempre que possível",
                                isCorrect: false,
                            },
                        ])];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.quizQuestionsTable)
                            .values({
                            quizId: quiz.id,
                            question: "Qual a primeira coisa que você deve tomar antes de investir a longo prazo, como em aposentadoria?",
                        })
                            .returning()];
                case 14:
                    q7 = (_a.sent())[0];
                    return [4 /*yield*/, db_1.db.insert(schema_1.quizAnswersTable).values([
                            { questionId: q7.id, answer: "Guardar dinheiro em casa", isCorrect: false },
                            {
                                questionId: q7.id,
                                answer: "Criar uma conta de poupança para emergências",
                                isCorrect: true,
                            },
                            {
                                questionId: q7.id,
                                answer: "Pedir empréstimo a um banco",
                                isCorrect: false,
                            },
                        ])];
                case 15:
                    _a.sent();
                    console.log("✅ Seed do Quiz 1 rodado com sucesso!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (err) {
    console.error(err);
    process.exit(1);
});
