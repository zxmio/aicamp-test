import React from 'react';

interface QuestionnaireProps {
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (questionNumber: number, answer: string | string[]) => void;
}

const questions = [
    {"type": "single_choice", "text": "选择您的性别", "options": ["男性", "女性"]},
    {"type": "single_choice", "text": "选择您的年龄", "options": ["18-24", "25-34", "35-44", "45+"]},
    {"type": "single_choice", "text": "您的主要目标是什么？", "options": ["提升收入", "成为自己的老板", "财务自由", "旅居生活", "职业发展", "工作生活平衡"]},
    {"type": "single_choice", "text": "您目前的收入来源是什么？", "options": ["全职工作", "创业收入","副业收入","被动收入", "其他"]},
    {"type": "single_choice", "text": "您的工作时间安排是怎样的？", "options": ["朝九晚五",  "我的时间很灵活", "我已退休"]},
    {"type": "multiple_choice", "text": "您当前工作面临的挑战是什么？", "options": ["收入低", "裁员危机", "缺乏发展空间", "工作时间太长", "持续压力", "养育压力", "其他"]},
    {"type": "single_choice", "text": "您如何描述您的财务状况？", "options": ["经常入不敷出","收支平衡，但缺乏积蓄", "有一定积蓄，但希望进一步提高", "财务状况良好，希望更上一层楼"]},
    {"type": "single_choice", "text": "您想要达到的年收入水平是多少？", "options": ["10-20万", "20-50万", "50-100万","100万以上"]},
    {"type": "single_choice", "text": "您是否希望对工作时间和地点有更多控制权？", "options": ["非常希望", "有一定兴趣", "不确定"]},
    {"type": "single_choice", "text": "您是否愿意尝试使用人工智能工具来提高工作效率？", "options": ["非常愿意", "有些兴趣", "不太确定", "暂时没有兴趣"]},
    {"type": "single_choice", "text": "如果能节省更多时间，您最想做什么？？", "options": ["学习新技能", "加深与亲人的关系", "促进个人成长", "优先考虑健康和福祉"]},
    {"type": "single_choice", "text": "如果能节省更多时间，您最想做什么？", "options": ["学习新技能", "陪伴家人", "发展个人兴趣爱好", "休息放松", "兼职创业"]},
    {"type": "single_choice", "text": "您是否希望从事与自己兴趣相符的工作？", "options": ["非常希望", "有些希望", "无所谓", "更看重收入"]},
    {"type": "single_choice", "text": "您对个人IP及商业变现了解多少？", "options": ["非常了解", "有一定了解", "了解有限", "完全不了解"]},
    {"type": "single_choice", "text": "您之前是否通过某种副业赚过钱？", "options": ["有稳定的副业收入", "偶尔做一些兼职", "尝试过但没有持续", "从未尝试过"]},
    {"type": "single_choice", "text": "您是否愿意学习新技能或技术？",  "options": ["非常愿意", "有一定兴趣", "要看具体情况", "暂时没有计划"]},
    {"type": "multiple_choice", "text": "您对以下哪些人工智能工具有所了解？（可多选）", "options": ["我是人工智能工具新手", "ChatGPT", "Midjourney","Claude","百度文心一言", "阿里通义千问", "Kimi","豆包","智谱清言","讯飞星火", "其他"]},
    {"type": "single_choice", "text": "评估您在内容创作方面的能力", "options": ["专业水平", "熟练", "一般", "新手"]},
    {"type": "single_choice", "text": "评估您在新媒体营销方面的知识", "options": ["专业水平", "熟练", "一般", "新手"]},
    {"type": "single_choice", "text": "您是否了解人工智能工具可以帮助提高工作效率和收入？", "options": ["非常了解", "有所耳闻", "不太清楚", "完全不知道"]},
    {"type": "multiple_choice", "text": "您最感兴趣的职业发展方向是？（可多选）", "options": ["内容创作", "直播带货", "金融投资", "教育培训", "其他"]},
    {"type": "single_choice", "text": "您认为自己掌握新技术的能力如何？", "options": ["非常强，学习速度快", "一般，但愿意努力学习", "需要更多时间和指导", "对新技术感到困难"]},
    {"type": "single_choice", "text": "评估您掌握人工智能的上手难度", "options": ["完全准备好", "准备好", "有些准备", "没有准备"]},
    {"type": "single_choice", "text": "您是否容易保持专注？", "options": ["是的，我可以轻松保持专注", "大多数时候可以，但有时会分心", "我经常挣扎", "不，我经常拖延"]},
    {"type": "multiple_choice", "text": "您是否有特别想要实现的目标？", "options": ["创立自己的公司", "稳定的副业", "买房", "结婚", "度假", "买车", "长途旅行", "其他"]},
    {"type": "single_choice", "text": "您准备每天投入多少时间来提升自己的技能和收入？", "options": ["1小时以内", "1-2小时", "2-3小时", "3小时以上"]}
];

const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  const question = questions[currentQuestion - 1];

  const handleSingleChoice = (option: string) => {
    onAnswer(currentQuestion, option);
  };

  const handleMultipleChoice = (option: string) => {
    const currentAnswers = Array.isArray(question.answer) ? question.answer : [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    onAnswer(currentQuestion, updatedAnswers);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        问题 {currentQuestion} / {totalQuestions}
      </p>
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-3 border rounded hover:bg-gray-100 transition-colors ${
              question.type === 'multiple_choice' && Array.isArray(question.answer) && question.answer.includes(option)
                ? 'bg-blue-100'
                : ''
            }`}
            onClick={() =>
              question.type === 'single_choice'
                ? handleSingleChoice(option)
                : handleMultipleChoice(option)
            }
          >
            {option}
          </button>
        ))}
      </div>
      {question.type === 'multiple_choice' && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => onAnswer(currentQuestion, question.answer || [])}
        >
          下一题
        </button>
      )}
    </div>
  );
};

export default Questionnaire;