var gulp = require('gulp');
var git = require('gulp-git');

gulp.task('gcheckout',function(){
	//console.log('gcheckout');
	//console.log('process',process.argv);
	
	gulp.src('./dist/*','./views/dashboard.jade')
  		.pipe(git.checkoutFiles());

  //gulp.src('./*')
  //.pipe(git.commit('commit message'));
});

gulp.task('gcommit',function(){
	
	var commit_message;
	var indexOfCommitMsg = process.argv.indexOf('--msg')
	if(indexOfCommitMsg<0){
		return "Enter Commit Message";
	}
	commit_message = process.argv[indexOfCommitMsg +1]
	//console.log('msg',commit_message);
	gulp.src('./*')
  		.pipe(git.commit(commit_message,{emitData:true}));
  		.on('data',function(data) {
      		console.log(data);
    	});
  	//console.log('gcommit');

});

gulp.task('gpull', function(){
  git.pull('origin', 'develop', {args: '--rebase'}, function (err) {
    if (err) throw err;
  });
  console.log('git pull and rebase completed successfully');
});

gulp.task('push', function(){
  git.push('origin', 'develop',{},function (err) {
    if (err) throw err;
  });
  console.log('git pushed successfully');
});


