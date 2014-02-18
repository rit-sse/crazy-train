---
layout: post
title: "Deploying this site: Github and FTPloy"
description: "Blogging has never been this easy!"
category: personal
tags: [Github, FTPloy, Deployment]
image:
  feature: machine.jpg
  credit: DeployHQ
  creditlink: http://www.deployhq.com
comments: true
---
When it comes to manage any coding project, [Git](http://git-scm.com/) is second to none for version control manager. I love Git. Its simple, easy and its awesome branching capabilities give tremendous push when developing something, whether its a big project or small. [Github](http://github.com) simply adds in to the experience as it opens up the door for collaboration. Now there is service called the [Github Pages](http://pages.github.com/) which has a Jekyll parser built right into it. It means, you have to upload your textile and markdown files, your layout folder and any other folder you would want to use if you'd have in case you wanted to generate the site locally- to a Github repository. From there its as simple as to create a new branch called *gh-pages* and the site gets generated and becomes live. Then all a user has to write a new post/page and save the file as markdown and commit/push the changes to the repo and the changes are shown instantly on the website.

While I like the automated Jekyll parsing feature of the Github pages, I do not like their server uptime and the lack of support for custom Jekyll plugins. Instead I went towards a free hosting service, and like all other free hosting services out there, it comes with a cPanel look-alike control center and does not include SSH terminal. This means I cannot install [Dropbox](http://dropbox.com) or Git in it to make a pull request everytime I post or change something. My options were limited to age-old File Transfer Protocol (FTP), I say this in this way not to belittle the FTP. FTP itself is a robust transfer protocol and used by millions all over the world. I say this because its not pragmatic to use it with Jekyll. Jekyll generates the site in a specified destination folder and everytime the site is updated, only some files gets changed. I could've used `git diff` command to look for the changed files and upload them one by one through FTP. If you think about it, this seriously hurts the workflow and takes the concentration away from the main motif of this project -WRITING. So there was no way I would use FTP even with Git. I had to figure something out for my Git repo to do it for me.

I soon figured out [Glynn](https://github.com/dmathieu/glynn‎), a command line Ruby utility to push the changed/updated files to a specified server. But that idea was short-lived when I found out it was made specifically for MAC OS and does not work on Windows Platform. I decided to use the web based services that offer Github to FTP services.

Then, I figured out [DeployHQ](http://deployhq.com). Its a web based service that allows you to deploy a provided git to a server using the FTP protocol. The free plan gives a user the ability to have one project with 10 deployments per day. I would note that DeployHQ does not support automatic deployment, once you've added/changed something in your project and committed the changes, you have to press the green "Deploy Now" button in your account page to push the files through FTP. It was a breeze until I found that sometimes during busy times of the day, the service is not that reliable. And changing the repository to a different repo with the exact same files freezes the whole deployment process. Again, I started looking for a reliable deployment tool that would help me deploy from my Github Repository to my web server via FTP and I found  [FTPloy](http://www.ftploy.com). The best thing about FTPloy's service is that they offer automated deployments to your server upon committing and pushing the changes in Github, it takes away all the useless clicks I had to perform to deploy the site with DeployHQ. This greatly streamlines the process of writing and blogging. After writing a blog post, I simply run the following five commands from the command line in my local workspace:  

{% highlight ruby %}
$ git build --destination <destionation>
$ cd <destination>
$ git commit -a -m "<Commit Message>"
$ git remote add origin git@github.com:username/reponame.git
$ git push origin master
{% endhighlight %}  

These commands generate the site locally and push the copy of the site to Github, which then gets pulled by FTPloy and it pushes the files to my web-server via FTP. Most of the time the changes can be seen instantaneously and really adds in to the experience.

FTPloy's free plan includes the ability to have one project with no limit on the deployment one could make in a single day. FTPloy also offers a simple sign-up and getting started with the deployment process is like eating a pie.