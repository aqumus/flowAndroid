var gulp = require('gulp');
var git = require('gulp-git');
var merge = require('merge-stream');

gulp.task('gcheckout',function(){
	//console.log('gcheckout');
	//console.log('process',process.argv);
	
	var sources=['./dist/*','./views/dashboard.jade'];
  	var tasks = sources.map(function(src){
        return gulp.src(src)
            	.pipe(git.checkoutFiles());
    });

    return merge(tasks);
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
  		.pipe(git.commit(commit_message,{emitData:true}))
  		.on('data',function(data) {
      		console.log(data);
    	});
  	//console.log('gcommit');

});

gulp.task('gadd',function(){
		return gulp.src('./*')
    				.pipe(git.add({args: '-u .'}));
	});

gulp.task('gpull', function(){
  git.pull('origin', 'master', {args: '--rebase'}, function (err) {
    if (err) throw err;
  });
  console.log('git pull and rebase completed successfully');
});

gulp.task('push', function(){
  git.push('origin', 'master',{},function (err) {
    if (err) throw err;
  });
  console.log('git pushed successfully');
});


