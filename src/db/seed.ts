import { db } from "@/db";

import { quizAnswersTable, quizQuestionsTable, quizzesTable } from "./schema";

async function main() {
  // Criar o quiz para o curso 1
  const [quiz] = await db
    .insert(quizzesTable)
    .values({
      courseId: "2b60df47-4e63-4174-8c5e-b86334dd0a9a",
      title: "Quiz de Educação Financeira - Curso 1",
    })
    .returning();

  // Pergunta 1
  const [q1] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question:
        "Qual o percentual de famílias brasileiras endividadas, segundo estudo citado?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
    { questionId: q1.id, answer: "30%", isCorrect: false },
    { questionId: q1.id, answer: "50%", isCorrect: false },
    { questionId: q1.id, answer: "77%", isCorrect: true },
  ]);

  // Pergunta 2
  const [q2] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question: "Qual a ideia principal da educação financeira?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  // Pergunta 3
  const [q3] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question: "O que significa 'consumo consciente'?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  // Pergunta 4
  const [q4] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question:
        "Qual é um bom hábito para evitar estar sempre sem dinheiro e precisar pagar contas atrasadas?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  // Pergunta 5
  const [q5] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question:
        "Depois de um ano, quem tinha dinheiro economizado está em uma melhor situação financeira?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  // Pergunta 6
  const [q6] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question: "Qual a principal medida para investir seu dinheiro?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  // Pergunta 7
  const [q7] = await db
    .insert(quizQuestionsTable)
    .values({
      quizId: quiz.id,
      question:
        "Qual a primeira coisa que você deve tomar antes de investir a longo prazo, como em aposentadoria?",
    })
    .returning();

  await db.insert(quizAnswersTable).values([
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
  ]);

  console.log("✅ Seed do Quiz 1 rodado com sucesso!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
