var models = require('../models/models.js');


function num_preguntas(quizes){
	return quizes.length;
};

function num_com(comentarios){
	return comentarios.length;
};

function avg(q,c){
	return c.length/q.length;
}

function preguntassin(q,c){ 
	var preg=[];
	for (var i =0; i<c.length; i++){
		if(preg[c[i].QuizId]) preg[c[i].QuizId]+=1;
		else preg[c[i].QuizId]=1;
		}

		llenas=0;
	for(var k = 0; k<preg.length; k++){
		if(preg[k]) llenas++;
	}

	return q.length-llenas;
}



// GET /quizes/statistics
exports.show = function(req,res){

	models.Quiz.findAll().then(function(quizes){

		models.Comment.findAll({where: {publicado: true}}).then(function(coment){
			if(coment ==undefined) coment = [];
			if(quizes == undefined ) quizes = [];
			var sin= preguntassin(quizes,coment);
			var preguntas =num_preguntas(quizes);

				res.render('quizes/data.ejs',{
				preguntas: preguntas, 
				comentarios: num_com(coment),
				media: avg(quizes,coment),
				sin: preguntassin(quizes,coment),
				con: preguntas - sin,
				errors:[]});})

			
		});



};
