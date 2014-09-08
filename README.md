#Crazy Train
[![Dependency Status](https://gemnasium.com/rit-sse/crazy-train.svg)](https://gemnasium.com/rit-sse/crazy-train)
[![Gitter chat](https://badges.gitter.im/rit-sse/crazy-train.png)](https://gitter.im/rit-sse/crazy-train)

*We're going off the rails on a crazy train*

## About

Crazy train is the new improved [SSE Website](https://sse.se.rit.edu). It's powered by Jekyll and auto deploys using webhooks. It's pretty cool.

## Repos
The SSE website has a lot of parts.

 * [crazy-train][1]
 * [crazy-train-pages][2]
 * [crazy-train-posts][3]
 * [wtf][4]
 * [pinocchio][5]
 * [nginx-conf][6]
 * [QDB][7]
 * [site-auto-deploy][8]
 * [scoreboard][9]
 * [governing-docs][10]
 * [meeting-minutes][11]

## Overview

### Crazy Train
Crazy train is the jekyll portion of the site. There are 3 submodules: [crazy-train-pages][2], [crazy-train-posts][3], [governing-docs][10], and [meeting-minutes][11].  Website team does not have push access to any of these submodules. They are for the officers.

If you are running crazy-train locally, do the following:

```
git submodule init
git submodule update --remote
```

If you need to update the submodules:

```
git submodule update --remote
```

Just a sidenote, `git submodule update --remote` requires git 1.8.2+. You should probably upgrade if you have a version below that.

#### Posts/Pages
Just commit and push to the repos to create a post or a page. Inside of the main crazy-train repo, there is a `Rakefile` with rake task `rake new_post`. That will generate a new post for you in the post directory.

If you need images, there are image directories in both posts and pages. The path to these images are `/assets/images/posts/YOUR_IMAGE.EXT` and `/assets/images/pages/YOUR_IMAGE.EXT` respectively.

### Auto Deploy

To make everyone's life a lot simpler, crazy-train auto-deploys when changed thanks to Github Webhooks. [site-auto-deploy][8], our daemon written in sinatra, is running on both the production and staging VMs listening for post requests. The following webhooks are set up:

##### Production
* crazy-train: Push to master
* crazy-train-posts: Push to master
* crazy-train-pages: Push to master
* governing-docs: Push to master

##### Staging
* crazy-train: Push to development
* crazy-train-posts: Push to master
* crazy-train-pages: Push to master
* governing-docs: Push to master

The deploy daemon on relevant actions will pull down the latest changes, attempt to build them into a tmp directory. If the build is successful, it will copy the changes to `_site` and deploy. If the build fails, the person who pushed will recieve an email saying the build has failed and to fix their changes. Notable problems in this process are:

1. You will recieve two emails if pushing to one of the submodules (one from production, one from staging)
2. The email doesn't include an error message.

Both of these will be fixed in the future.

Theoretically, the rest of the site (QDB, Scoreboard, WTF, and Pinnochio) could be autodeployed but those webhooks aren't set up.

### Nginx-conf
In a private repo, you will find our production nginx conf. If you make any changes to it and you have sudo access, go pull it down and restart nginx. If you don't have sudo access, tell someone who does to do it.

### WTF
WTF was our old rails site. Since the event system on WTF is still needed, a stripped down version of it is running that only includes Events. This is on a branch, `only-events`.  It soon will be merged into master.  You can find this portion of the site [here](https://sse.se.rit.edu/admin).  If you are an officer, you can log in using the same credentials you use for email and the file share.

### Pinnochio
Pinocchio is the link shortener written in sinatra. Use your sse credentials to log in You can access it [here](https://sse.se.rit.edu/go)

### QDB
The QDB is the SSE Quote Database written in Rails 3. You can access it [here](https://sse.se.rit.edu/qdb). QD

### Scoreboard
Scoreboard is the membership tracker written in Padrino. It is deployed. Use your sse credentials to log in if you are an officers.

## Questions?
Kristen is pretty much in charge of the website these days. Ask her.

[1]: https://github.com/rit-sse/crazy-train
[2]: https://github.com/rit-sse/crazy-train-pages
[3]: https://github.com/rit-sse/crazy-train-posts
[4]: https://github.com/rit-sse/wtf
[5]: https://github.com/rit-sse/pinocchio
[6]: https://github.com/rit-sse/nginx-conf
[7]: https://github.com/rit-sse/qdb
[8]: https://github.com/rit-sse/site-auto-deploy
[9]: https://github.com/rit-sse/scoreboard
[10]: https://github.com/rit-sse/governing-docs
[11]: https://github.com/rit-sse/meeting-minutes
