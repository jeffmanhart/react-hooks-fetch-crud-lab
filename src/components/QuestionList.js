import React , {useEffect , useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions , setQuestions] = useState([])
  
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((q) => setQuestions(q));
  }, []);
  
function handleDeleteClick(id){
  fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
}

function handleAnswerChange(id , correctIndex){
  console.log(id ,"      ", correctIndex)
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex })
  })
    .then((r) => r.json({}))
    .then((question) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id ===question.id){
          return question
        } else{
          return q
        }
      });
      setQuestions(updatedQuestions);
    });
}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((q)=>
        <QuestionItem 
          key={q.id } 
          question={q}
          onDeleteClick={handleDeleteClick}
          onAnswerChange={handleAnswerChange}/>
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
