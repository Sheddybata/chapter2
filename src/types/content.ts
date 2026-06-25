export type EventStatus = "upcoming" | "past";

export type CampaignEvent = {
  id: string;
  title: string;
  event_date: string;
  location: string;
  description: string;
  status: EventStatus;
  sort_order: number;
  created_at: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  sort_order: number;
  created_at: string;
};

export type CreateEventInput = {
  title: string;
  eventDate: string;
  location: string;
  description: string;
  status: EventStatus;
};

export type CreateQuizQuestionInput = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};
