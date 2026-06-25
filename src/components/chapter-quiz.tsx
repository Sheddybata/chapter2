"use client";

import { useMemo, useState } from "react";

import type { QuizQuestion } from "@/types/content";

type ChapterQuizProps = {
  questions: QuizQuestion[];
};

export function ChapterQuiz({ questions }: ChapterQuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const score = useMemo(
    () =>
      questions.reduce((total, question, index) => {
        return total + (answers[index] === question.answer ? 1 : 0);
      }, 0),
    [answers, questions],
  );

  if (questions.length === 0) {
    return (
      <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Student quiz
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
          Test your Chapter II knowledge
        </h2>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Quiz questions will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
            Student quiz
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
            Test your Chapter II knowledge
          </h2>
        </div>
        <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-900">
          Score: {score}/{questions.length}
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {questions.map((question, index) => {
          const selected = answers[index];

          return (
            <fieldset
              key={question.id}
              className="rounded-[1.5rem] border border-stone-200 p-4"
            >
              <legend className="px-2 text-base font-black text-stone-900">
                {index + 1}. {question.question}
              </legend>
              <div className="mt-4 grid gap-2">
                {question.options.map((option) => {
                  const isSelected = selected === option;
                  const isCorrect = question.answer === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [index]: option,
                        }))
                      }
                      className={[
                        "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                        isSelected && isCorrect
                          ? "border-emerald-700 bg-emerald-50 text-emerald-950"
                          : "",
                        isSelected && !isCorrect
                          ? "border-red-300 bg-red-50 text-red-950"
                          : "",
                        !isSelected
                          ? "border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300"
                          : "",
                      ].join(" ")}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {selected ? (
                <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">
                  {question.explanation}
                </p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
