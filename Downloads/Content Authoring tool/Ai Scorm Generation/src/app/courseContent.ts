export interface SlideOption { text: string; correct: boolean; remark: string; showRemark?: boolean }
export interface SlideQuestion { id: string; type: 'MCQ' | 'True/False'; text: string; options: SlideOption[]; points: number }
export interface CourseTopic {
  id: string;
  title: string;
  slideType?: string;
  content?: string;
  bullets?: string[];
  presenter?: string;
  script?: string;
  questions?: SlideQuestion[];
  element?: string;
  audioScript?: string;
  videoGenerated?: boolean;
  imageUploaded?: boolean;
  videoUploaded?: boolean;
  audioGenerated?: boolean;
  contentReady?: boolean;
  [key: string]: unknown;
}
export function generateSlideContent(topic: CourseTopic, courseTitle: string, questionCount = 1): CourseTopic {
  if (topic.contentReady) return topic;
  const content = `In ${courseTitle}, ${topic.title.toLowerCase()} helps you connect the main ideas with practical decisions. Identify the key concept, consider a realistic example, and explain how you would apply it in your work.`;
  const bullets = [`Identify the key ideas behind ${topic.title.toLowerCase()}.`, 'Connect each idea to a practical example.', 'Apply what you have learned and reflect on the result.'];
  const result: CourseTopic = { id: topic.id, title: topic.title, slideType: topic.slideType, contentReady: true, content };
  if (topic.slideType === 'title-bullets' || topic.slideType === 'summary') result.bullets = bullets;
  if (topic.slideType === 'spokesperson') { result.presenter = 'Maya'; result.script = `Welcome to ${topic.title}. ${content}`; }
  if (topic.slideType === 'audio') result.audioScript = content;
  if (topic.slideType === 'scenario') { result.element = 'sequencing'; result.bullets = bullets; }
  if (topic.slideType === 'quiz' || topic.slideType === 'knowledge-check') {
    result.questions = Array.from({ length: Math.max(1, Math.min(50, questionCount)) }, (_, i) => ({
      id: topic.id + '-q-' + i, type: 'MCQ', points: 1,
      text: `Practice ${i + 1}: Which action best applies ${topic.title.toLowerCase()}?`,
      options: [
        { text: 'Apply the concept to a relevant situation and review the outcome.', correct: true, remark: 'Correct. Practice and reflection help you apply your learning.' },
        { text: 'Ignore the context and repeat the same action.', correct: false, remark: 'Consider the context before choosing an action.' },
        { text: 'Skip the activity without checking your understanding.', correct: false, remark: 'Try applying the concept to check your understanding.' },
      ],
    }));
  }
  return result;
}
