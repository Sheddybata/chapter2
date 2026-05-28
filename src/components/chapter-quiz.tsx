"use client";

import { useMemo, useState } from "react";

import { quizQuestions } from "@/lib/learning";

export function ChapterQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const score = useMemo(
    () =>
      quizQuestions.reduce((total, question, index) => {
        return total + (answers[index] === question.answer ? 1 : 0);
      }, 0),
    [answers],
  );

  const completed = Object.keys(answers).length === quizQuestions.length;

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
          Score: {score}/{quizQuestions.length}
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {quizQuestions.map((question, index) => {
          const selected = answers[index];

          return (
            <fieldset
              key={question.question}
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

      {completed ? (
        <div className="mt-6 rounded-[1.5rem] bg-emerald-900 p-5 text-white">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-100">
            Completion badge
          </p>
          <p className="mt-2 text-2xl font-black">
            Young Citizen: Chapter II Explorer
          </p>
          <p className="mt-2 text-sm leading-6 text-emerald-50/85">
            Frontend-only certificate preview. Later, this can generate a
            downloadable certificate or save progress after a backend is added.
          </p>
        </div>
      ) : null}
    </div>
  );
}
