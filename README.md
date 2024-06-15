<h1>Welcome!</h1>

### CompNation Overview
<p>CompNation is a competitive mobile app that let's users plan out and battle each other through a bracket and knockout system!</p>
</br>

## Table of Contents

- [About the Project](#-compnation-overview)
- [Getting Started](#getting-started)
  - [Pre-requisites](#getting-started)
  - [Cloning the repo onto your system](#cloning-the-repo-onto-your-system)
  - [Running the Development Environment](#running-the-development-environment)
  - [Viewing the app on your Phone](#viewing-the-app-on-your-phone)

</br>

## Getting Started
<p>To get a development build of this project up and running on your system make sure you have the following</p>

### Pre-requisites:
<ul>
<li>Node (installed on Hosting device)<span><a href="https://nodejs.org/en/download/"> Node Offical Download</a></span></li>
<li>GitHub Desktop - <a href="https://desktop.github.com/">GitHub Offical Download</a></li>
<li>Expo Go (Phone app availible on <a href="https://play.google.com/store/apps/details?id=host.exp.exponent">Google Play</a> store or Apple <a href="https://apps.apple.com/us/app/expo-go/id982107779">AppStore</a>)</<li>
</ul>

### Cloning the repo onto your system:
<p>once you have Node and GitHub Desktop on your machine, head over to the top of this repo (the top of the page where you are reading this) and click on the green dropdown "Code" button:</p>
</br>

![code](https://github.com/GodwinCameron/CompNation/assets/71267628/6db53b1a-ac00-44c9-bcab-98655b43de9b)

<p>Then click the "Copy url to clipboard" button, or just manually select this link:</p>

![copy](https://github.com/GodwinCameron/CompNation/assets/71267628/b47b1ece-d37c-489b-a901-37787fe4d96d)

<p>After this, open up your GitHub Desktop, and select the Repository dropdown (if this is the first time you're using GitHub Desktop, the default repository should be "desktop-tutorial")</p>

![repo](https://github.com/GodwinCameron/CompNation/assets/71267628/260d94aa-a983-4487-ae91-536aa01a795d)

<p>Now select "Add" and then "Clone repository..."</p>

![add](https://github.com/GodwinCameron/CompNation/assets/71267628/e637eba0-c58c-407e-bbbf-ffe1c9aa6a34)

<p>Navigate to the URL tab and paste the link in that we copied from earlier</p>

![paste](https://github.com/GodwinCameron/CompNation/assets/71267628/5dfbf41b-6760-4a40-b5ec-aede4c915dc5)

<p>Now you can right-click on the Current repository dropdown once again and copy the repo path, this will make navigating in the command line easier.</p>

![path](https://github.com/GodwinCameron/CompNation/assets/71267628/021bd861-848b-4c07-a00d-dee1da3cd030)

<p>Great! Now the repository is on your machine and we're almost ready to run the development environment!</p>
<p>If you'd like to edit or change any of the code, you can either fork the branch or commit to your own GitHub account.</p>
</br>

### Running the Development Environment:
<p>For this section, you'll need to open up your command line, this is either Command Prompt (CMD) for Windows or Termianl for iOS.</p>
<p>Next, navigate to the repository by typing </p>

```cd [repo path]```

<p>and hitting enter. If you copied the path from the Cloning the repo onto your system section, then you can just it after the cd and a space. (note* if you're on Windows and the command line opens on a different drive by default, you will need to first access the drive where the repo is stalled before running the change directory command or it will not locate the path. You can do this by typing the the numeric of the drive followed by a colon, the drive numeric will also display at the start of the path if you coped from the GitHub Desktop tab. and example of that would look like this):</p>
<p>Command 1.):</p>

``` D: ```

<p>Command 2.):</p>

``` cd [repo path] ```

</br>
<p>Once you've navigated to the repository directory on your command line, type the following command:</p>

```npm i ```

<p>This will use Node's package manager to install all the relavent dependacies for running this development environment, and will take a couple minutes.</p>
<p>Once this command is completed, you can type the following command:</p>

``` npm start ```

<p>This will initiate the development environment as well as host it locally on your network. Once the environment is running, you should see a QR code and some Metro app info that looks something like this: </p>

![npm](https://github.com/GodwinCameron/CompNation/assets/71267628/cdacbb06-9dc1-4704-82f9-4c57e39da36c)

<p>The development environment is now running on your local network!</p>
</br>

### Viewing the app on your Phone:
<p>Once you've gotten the development environment up and running on your local network, ensure that your phone is also connected to the same network as your hosting device.</p>
<p>Then open your Expo Go App and either scan the QR code from the Command Line Interface or copy the IP Address into the field on your phone. Once you see the entry point loading, you're all set!</p>





