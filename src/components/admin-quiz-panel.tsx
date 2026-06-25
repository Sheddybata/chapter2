"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { addQuizQuestion, removeQuizQuestion } from "@/app/admin/quiz/actions";
import type { QuizQuestion } from "@/types/content";

type AdminQuizPanelProps = {
  questions: QuizQuestion[];
};

const inputClassName =
  "rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-700/20 focus:ring-4";

export function AdminQuizPanel({ questions }: AdminQuizPanelProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const options = [optionOne, optionTwo, optionThree, optionFour].filter(Boolean);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await addQuizQuestion({
      question,
      options: [optionOne, optionTwo, optionThree, optionFour],
      answer,
      explanation,
    });

    if (result.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    setQuestion("");
    setOptionOne("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
    setAnswer("");
    setExplanation("");
    router.refresh();
    setIsLoading(false);
  }

  async function handleDelete(questionId: string) {
    setIsLoading(true);
    setMessage(null);

    const result = await removeQuizQuestion(questionId);

    if (result.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    router.refresh();
    setIsLoading(false);
  }

  return (
    <div className="grid gap-10">
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-black text-emerald-950">Add quiz question</h2>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Question
            <textarea
              className={`${inputClassName} min-h-24`}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
          </label>
          {[optionOne, optionTwo, optionThree, optionFour].map((_, index) => {
            const setters = [setOptionOne, setOptionTwo, setOptionThree, setOptionFour];
            const values = [optionOne, optionTwo, optionThree, optionFour];

            return (
              <label key={index} className="grid gap-2 text-sm font-bold text-stone-700">
                Option {index + 1}
                <input
                  className={inputClassName}
                  value={values[index]}
                  onChange={(event) => setters[index](event.target.value)}
                  required={index < 2}
                />
              </label>
            );
          })}
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Correct answer
            <select
              className={inputClassName}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              required
            >
              <option value="">Select the correct option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-700">
            Explanation
            <textarea
              className={`${inputClassName} min-h-24`}
              value={explanation}
              onChange={(event) => setExplanation(event.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 rounded-full bg-emerald-800 px-6 py-3 text-sm font-black text-white disabled:opacity-60"
        >
          {isLoading ? "Saving..." : "Add question"}
        </button>
      </form>

      {message ? (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{message}</p>
      ) : null}

      <section className="grid gap-4">
        <h2 className="text-2xl font-black text-emerald-950">Current questions</h2>
        {questions.length === 0 ? (
          <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm text-stone-600">
            No quiz questions yet.
          </p>
        ) : (
          questions.map((item, index) => (
            <article
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:flex-row sm:items-start"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  Question {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-black text-emerald-950">{item.question}</h3>
                <ul className="mt-4 grid gap-2 text-sm text-stone-600">
                  {item.options.map((option) => (
                    <li key={option} className="rounded-2xl bg-stone-50 px-4 py-2">
                      {option}
                      {option === item.answer ? " (correct)" : ""}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-6 text-stone-600">{item.explanation}</p>
              </div>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => void handleDelete(item.id)}
                className="rounded-full bg-stone-700 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                Remove
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
