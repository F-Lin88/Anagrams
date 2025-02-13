# Anagraminator
[![icon](https://i.imgur.com/5fo9rDs.png)](https://chromewebstore.google.com/detail/anagraminator/ojimpjlldmgoalicgndlagglgemfncaa)

## The Project

### Aim
Primary Aim: To deploy a static, single-player web game, and learn/develop basic frontend coding skills.

Secondary Aim: Play Anagrams!

### Composition 
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

This project is a simple static web game composed in JavaScript, HTML and CSS. The MDN web/window API is used for basic persistance of game configs, and to redirect players to different pages.

### Deployment
This project is deployed as both a public chrome extension and website hosted on GitHub pages. These endpoints were chosen to maximise the game's exposure and accessibility, whilst balancing cost; Chrome Developer account incurs a minor fee, but published extensions are available to anyone with a Chrome account and easy to install; GitHub pages is a free hosting avenue for static websites that is accessible to all on the web.

Initially, the first version of this project was also deployed using Vercel, but releases using vercel was discontinued as their cloud and database services were unnecessary, and users required a Vercel account for access.

### Links
- [GitHub Repo](https://github.com/Felix-Lin-8864/Anagrams)
- [GitHub Pages](https://felix-lin-8864.github.io/Anagrams/)
- [Chrome Webstore Listing](https://chromewebstore.google.com/detail/anagraminator/ojimpjlldmgoalicgndlagglgemfncaa)
- [English Dictionary (words.json)](https://github.com/dwyl/english-words)
- [Vercel Release (Legacy)](https://anagrams-g5bvavqo8-felixs-projects-6fe04eba.vercel.app/)

## The Game

A simple single-player anagrams game:
- Form as many words as you can from a randomly generated set of N letters within the chosen time limit; points awarded scale with word length
- Select the number of letters N in (6..=9), time limit (30, 45, 60)
- Select from Normal, Extended and Challenge game modes

### Normal Mode
![Normal Mode](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2wzcjZ2ZXU3aWhtc3NnN2lqaHMyMWM1bHNoemxxMGgzcHF3dDMwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KXvctGvfYrDNGCYyBS/giphy.gif)

Cannot repeat letters to form words, but generated set may contain duplicates.

### Extended Mode
![Extended Mode](https://media.giphy.com/media/k7YkkGi8w2cVE1zXRX/giphy.gif)

Can repeat letters to form words, and letters in the generated set are guranteed to be unique.

### Challenge Mode
![Challenge Mode](https://media.giphy.com/media/BA0ippG26rMS5jMYVE/giphy.gif)

Extended Mode, but new letters are generated after every valid submission.

### Solver
![Solver](https://media.giphy.com/media/rc3Xh6ZCBrsqaMSKVq/giphy.gif)

Enter up to 9 letters, and the solver will list all words that can be formed from them in Normal Mode, ordered by decreasing length.
