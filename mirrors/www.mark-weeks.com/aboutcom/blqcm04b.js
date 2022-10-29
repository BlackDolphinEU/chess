//
// QueryString
//

function QueryString(key)
{
	var value = null;
	for (var i=0;i<QueryString.keys.length;i++)
	{
		if (QueryString.keys[i]==key)
		{
			value = QueryString.values[i];
			break;
		}
	}
	return value;
}
QueryString.keys = new Array();
QueryString.values = new Array();

function QueryString_Parse()
{
	var query = window.location.search.substring(1);
	var pairs = query.split("&");
	
	for (var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf('=');
		if (pos >= 0)
		{
			var argname = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			QueryString.keys[QueryString.keys.length] = argname;
			QueryString.values[QueryString.values.length] = value;		
		}
	}

}

QueryString_Parse();


//
// Answer
//
function Answer_WriteHTML()
{
	document.write('<INPUT type="radio" value="' + this.id + '" name="answers"> ');
	document.write('<span  class="quizText">' + this.text + '</span><br>');
}

function Answer(aID)
{
	this.text = "New Answer";
	this.id = aID;
	this.correct = false;
	
	this.WriteHTML = Answer_WriteHTML;
}

//
// AnswerList
//

function AnswerList_NewAnswer()
{
	var a = new Answer(this.sequenceID);
	this.sequenceID++;
	this.aList[this.aList.length] = a;

	// Optional Args: text, correct
	if (arguments.length > 0)
		a.text = arguments[0];

	if (arguments.length > 1)
		a.correct = arguments[1];

	if (this.editor)
		this.editor.AnswerSectionUpdate();
		
	return a;
}

function AnswerList_Remove(id)
{
	for (var i=0;i<this.aList.length;i++)
	{
		if (this.aList[i] && this.aList[i].id == id)
		{
			this.aList[i] = null;
			break;
		}
	}
}

function AnswerList_Find(id)
{
	var result = null;
	for (var i=0;i<this.aList.length;i++)
	{
		if (this.aList[i] && this.aList[i].id == id)
		{
			result = this.aList[i];
			break;
		}
	}
	return result;
}

function AnswerList_WriteHTML()
{
	for (var i=0;i<this.aList.length;i++)
		this.aList[i].WriteHTML();
}

function AnswerList(editor)
{
	this.editor = editor;
	this.sequenceID = 0;
	this.aList = new Array();
	
	this.NewAnswer = AnswerList_NewAnswer;
	this.Remove = AnswerList_Remove;
	this.Find = AnswerList_Find;
	this.WriteHTML = AnswerList_WriteHTML;
}

//
// Question
//

function Question_NewImage(text)
{
	this.Image = text;
}

function Question_NewAnswer(text,correct)
{
	this.answerList.NewAnswer(text,correct);
}

function Question_WriteHTML()
{
	document.write('<p>'+this.Image+'</p>');
        document.write('<p>Q' + this.text + ' Which move is checkmate?</p>');
	this.answerList.WriteHTML();
}

function Question_GetCorrectAnswer(text,correct)
{
	var result = "";
	for (var i=0;i<this.answerList.aList.length;i++)
	{
		if (this.answerList.aList[i] && this.answerList.aList[i].correct)
		{
			result = this.answerList.aList[i].text;
			break;
		}
	}
	return result;
}

function Question(qID,editor)
{
	this.text = "New Question";
	this.id = qID;
	this.editor = editor;
		
	this.NewImage = Question_NewImage;
	this.answerList = new AnswerList(editor);
	this.NewAnswer = Question_NewAnswer;
	this.WriteHTML = Question_WriteHTML;
	this.GetCorrectAnswer = Question_GetCorrectAnswer;
}

//
// QuestionList
//

function QuestionList_NewQuestion()
{
	var q = new Question(this.sequenceID,this.editor);
	this.sequenceID++;
	this.qList[this.qList.length] = q;
	
	// Optional Args: text
	if (arguments.length > 0)
		q.text = arguments[0];
	
	if (this.editor)
		this.editor.QuestionItemsAdd(q);
		
	return q;
}

function QuestionList_Remove(id)
{
	for (var i=0;i<this.qList.length;i++)
	{
		if (this.qList[i] && this.qList[i].id == id)
		{
			this.qList[i] = null;
			break;
		}
	}
}

function QuestionList_Find(id)
{
	var result = null;
	for (var i=0;i<this.qList.length;i++)
	{
		if (this.qList[i] && (this.qList[i].id == id))
		{
			result = this.qList[i];
			break;
		}
	}
	return result;
}

function QuestionList_WriteHTML()
{
	var index = 0;
	
	var lastQuestion = QueryString("lastQuestion");
	var ccount = QueryString("ccount");

	if (ccount == null)
		ccount = 0;
	else
		ccount = parseInt(ccount);

	document.write('<form name="quiz" method="GET" onsubmit="return QuestionListValidate(this)">');
		
	
	if (lastQuestion!=null)
	{
		lastQuestion = parseInt(lastQuestion);
		index = 1 + lastQuestion;
		var answerID = parseInt(QueryString("answers"));
		
		if (this.qList[lastQuestion].answerList.aList[answerID].correct)
		{
                        document.write('<p>Q'+this.qList[lastQuestion].text+' Correct!</p>');
                        ccount++;
		}
		else
		{
			var correctAnswer = this.qList[lastQuestion].GetCorrectAnswer();
                        document.write('<p>Q');
                        document.write(this.qList[lastQuestion].text);
                        document.write(' Wrong! ');
                        document.write(' The correct answer is ');
                        document.write(correctAnswer + '.</p>');
                }

		document.write('<p ALIGN=CENTER>***</p>');
		
	}
	
	if (index < this.qList.length)
	{
		document.write('<input type="hidden" name="lastQuestion" value="' + index + '">')
		
		this.qList[index].WriteHTML();
		document.write('<p><input type="submit" name="submit" value="Next Question >>"></p>')
	}
	else
	{
		var score = Math.round((ccount*100)/this.qList.length);
		var scoreResults = this.ScoreResults(Math.min(Math.floor(score/10),9));
		document.write('<p>You answered ' + ccount + ' items out of ' +
			this.qList.length + ' correctly.</p>');
		document.write('<p>Your score is ' + score + '%. ' + scoreResults + '</p>');
                document.write('<p>See <i>More of this Feature</i> for more quizzes like this one.</p>');
        }
	
	document.write('<input type="hidden" name="ccount" value="' + ccount + '">')
	document.write('</form>');
	
}

function QuestionList_ScoreResults(index,text)
{
	// Optional Args: text
	if (arguments.length > 1)
	{
		this.scoreResults[index] = text;
	}
		
	return this.scoreResults[index];
}

function QuestionList(editor)
{
	this.sequenceID = 0;
	this.qList = new Array();
	this.scoreResults = new Array(10);
	this.editor = editor;
	
	this.NewQuestion = QuestionList_NewQuestion;
	this.Remove = QuestionList_Remove;
	this.Find = QuestionList_Find;
	this.WriteHTML = QuestionList_WriteHTML;
	this.ScoreResults = QuestionList_ScoreResults;
}

function QuestionListValidate(theForm)
{
	var validated = false;
	
	for (var i=0;i<theForm.answers.length;i++)
	{
		if (theForm.answers[i].checked == true)
		{
			validated = true;
			break;
		}
	}
	
	if (!validated)
		alert("Please select an answer before continuing.");
	
	return validated;
}

var gQuestionList = new QuestionList(null);

// Quiz Source Start (to edit with QuizEditor copy/paste between here and end
// -->

gQuestionList.ScoreResults(0,"Are you sure you are trying?");
gQuestionList.ScoreResults(1,"You may want to practice more.");
gQuestionList.ScoreResults(2,"You may want to practice more.");
gQuestionList.ScoreResults(3,"You may want to practice more.");
gQuestionList.ScoreResults(4,"You may want to practice more.");
gQuestionList.ScoreResults(5,"You may want to practice more.");
gQuestionList.ScoreResults(6,"Not bad.");
gQuestionList.ScoreResults(7,"Good job!");
gQuestionList.ScoreResults(8,"Great job!");
gQuestionList.ScoreResults(9,"Excellent job!");
q = gQuestionList.NewQuestion("4.1");
q.NewImage("<IMG SRC=images/blqcm04h.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0063 -->");
q.NewAnswer("Nf5+",false);
q.NewAnswer("Ng6+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.2");
q.NewImage("<IMG SRC=images/blqcm04i.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0064 -->");
q.NewAnswer("Nxe6+",true);
q.NewAnswer("b4+",false);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.3");
q.NewImage("<IMG SRC=images/blqcm04j.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0065 -->");
q.NewAnswer("Rd7",false);
q.NewAnswer("Rd8+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.4");
q.NewImage("<IMG SRC=images/blqcm04k.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0069 -->");
q.NewAnswer("Na7+",false);
q.NewAnswer("Nb6+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.5");
q.NewImage("<IMG SRC=images/blqcm04l.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0072 -->");
q.NewAnswer("Rh7",false);
q.NewAnswer("Rxh8+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.6");
q.NewImage("<IMG SRC=images/blqcm04m.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0076 -->");
q.NewAnswer("Nxh7",false);
q.NewAnswer("Rxg8+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);
q = gQuestionList.NewQuestion("4.7");
q.NewImage("<IMG SRC=images/blqcm04n.gif WIDTH=280 HEIGHT=280><!-- REI-1KCM:0077 -->");
q.NewAnswer("Nh7+",false);
q.NewAnswer("Rg8+",true);
q.NewAnswer("Both",false);
q.NewAnswer("Neither",false);

// <-- Quiz Source End 
