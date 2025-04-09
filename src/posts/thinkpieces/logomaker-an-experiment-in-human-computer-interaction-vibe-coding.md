---
title: "Logomaker: An experiment in human-computer interaction and ✨vibe coding ✨"
date: "2025-04-08"
category: "thinkpieces"
excerpt: "Exploring the world of vibe coding through a logo creation tool, with insights on different LLMs and the changing landscape of software development."
author: "Johnny Dunn"
tags: ["featured"]
---

# Logomaker: An experiment in human-computer interaction and ✨vibe coding ✨

**GitHub link: [https://github.com/manicinc/logomaker](https://github.com/manicinc/logomaker)**

***Note: Each LLM tested (GPT-4o, GPT-4.5, GPT–o1, Claude Sonnet 3.7, Gemini 2.5 Pro) was done using the default settings (No extended thinking / deep research, no 200$ Pro subscription or web search experimental plugins or memories). I used the basic plan and default options for each (all set at 20$ a month currently). This is only called an experiment in title, as it is incredibly anecdotal. Everything was written / tested in VS Code with Copilot enabled and used to solve single line bugs.***

At the time of writing this, I'll have been in the software field for the upper half of but still quite far away decade amount of time. It might be a unpleasant shock to realize this declaration is necessary to introduce this post, because there are in fact non-junior engineers (as in, mid-level, as in, working for multiple years now) who **just** might have gotten away with not handwriting a class or file, function, or even line of code without the aid of generative AI.

Last week, while working on one of our open-source projects PortaPack ([https://github.com/manicinc/portapack](https://github.com/manicinc/portapack)), which is also being launched and released along with this post detailing our experiences building Logomaker (the two play nicely with our design philosophies of portability and software sustainability). I wanted to play around with some logo designs / typefaces before finalizing on a branding decision with the rest of our small team, who all work on their own projects, roles, and ventures, hence the usefulness of a rapid prototyping tool (***self-reliance!***).

![The final version of the PortaPack logo, graphical](/assets/blog/portapack-logo.png)
*The final version of the PortaPack logo, graphical.*

A cute, whimsical sort of feel was what I wanted. And it was a rough time finding something online I could get started with quickly. The strongly recommended recommendations for free logo makers coming in random threads almost always linked to gated paywalls and account subscriptions, oftentimes behind dark patterns, like being the next step before an image export after all the edits had been done by the user in a locked in UI, or limiting PNG quality exports to an clearly unusable amount.

It's common these days for tech projects to lock in their users into their software, and unfortunately also not be transparent about the limitations that they impose with those guards. Ones also specifically designed to elicit a payment, which oftentimes is just a one-time fee (as the first one is always the hardest one to get) making subscriptions and recurring payments for the actual loyal customers much more inconvenient. These are things that result in login screens and dashboard management features taking second precedence over new customers, or payment cancellation options behind hard to get to.

Sheer frustration, a desire for a nice usable experience for something I wanted to do, and a stirring curiosity to see what would happen if we did things just to see what would happen brought me to pitch an idea to our devs: Vibe code an entire project, full-stack and fully usable--every function written by an LLM, every design done by an LLM. Besides, this is just what everybody in the world is going to start doing, if your sites and apps have a dreadful enough user experience.

Logomaker sounds like a pretty good scope for this. It's no fintech or healthcare app, the worst that happens is a user wastes their time trying a (unintendedly broken) site that has no ads and tracks no data. Hopefully it's not unintendedly broken but who's Q/Aing this stuff anyway? Logomaker, the app built 90% by ChatGPT? It's Q/Aed by no one, use at your own peril.

![An example logo created with Logomaker](/assets/blog/logomaker-manic-example.png)
*An example logo created with Logomaker*

## LLM sees, LLM does

I have a background going to an art and design college. But art (even just visual art) is so encompassing that logo designs are something I don't think I ever studied. I have Photoshop and Illustrator experience, but rarely gave thought to how something like image editing software would actually work. So, none of the product features you see in the logo generator were pitched by me originally but they were refined.

At the moment, this iterative product management process in giving product-driven prompts in addition to technical-guided ones was highly necessary, to create anything deemed worthy of being usable by a human being in 2025. On its own, the LLMs from Anthropic (Sonnet 3.7), ChatGPT (GPT-4o, GPT-o1, GPT-4.5), and Google Gemini (2.5 Pro), all of which were extensively tested and ✨vibe coded ✨ with throughout, could only go so far in self-improving their own code, styles, and features.

Without human guidance at various points in this process, mapping out sensible AND robust user flows the way humans want to use software seems more difficult for LLMs than implementing very complex algorithms. Is this a limitation of something like a creativity mechanism in the LLM? Or is it a natural consequence of its training data? What happens if we get 10,000 product designers to write 10,000 user stories each? (100 billion user stories! This would entail in a model that really is about as large as or in the ballpark of GPT-3). Would the output of those models result in the most well-designed software the world's ever known?

For example, the LLMs of course knew what basic and desirable functionalities would go into a design tool like this, so of course exporting options were done (and fully working I might add, from the LLM writing the exact dependency links needed from the CDN link for html2canvas.js), and with multiple exporting options, though it was basic and naturally didn't include SVG (which would be really complex, so it makes sense it's originally ignored unless prompted).

So, it'd be easy for me to simply ask for additional exporting options of GIF and SVG, which I did. But if I didn't prompt the LLM to specifically design the addition of these new features in a way that, say, really considered the user experience, or even specifically instructed the LLM to do this, it would (typically) output the components to render a GIF, SVG, and PNG, but all 3 as just buttons with working functionality and no additional considerations in enhancing the UX. Tooltips, mobile responsive styles, etc. sure, it doesn't go far beyond that though. It feels like, in general, LLMs like to be conservative in their token output / generation, which, in coding, isn't good when you're getting incomplete scripts, or, in many, many, many cases, placeholder logic that sneakily hides its way in there even when the LLM has been instructed aggressively to not output those comments.

So, why even bother to offer different exporting options? What are the advantages of one or the other? SVGs are vector-based and scalable to any size and dimension. So SVGs are always better right?

No, because it's actually very hard to do things like programmatic animations of styles, etc. in a media type like SVG, because of its nature and complex implementation. So while CSS might be.. easy to style with (said with gritted teeth) and "easy" to export (well, it has its own quirks), good luck man at converting those accurately to SVG. Meaning, SVGs are nice for flexibility and GIFs are good for styling. This is a clear, straightforward distinction to make. And when you ask this to a LLM they, like most people familiar with this context, can give you that dead-on accurately.

Here's the issue. How can you guide a LLM to think about things like this, without specifically listing this type of thing as an example? Because, the thing about examples, is that when you have few or limited ones, you run into a limitation that is the same feature that empowers one-shot or few-shot learning (the ability for an LLM to learn relatively easily from a few examples just in the context of the prompt itself without actually retraining its data / model).

![This is the first iteration of the "ultimate logo generator" which was all asked to be built and written in one file. The end result was just under 1000 lines.](/assets/blog/logomaker-old-version-first-one.png)
*This is the first iteration of the "ultimate logo generator" which was all asked to be built and written in one file. The end result was just under 1000 lines.*

While I don't have the original prompt that was used to create this file, the working version was generated in one-go (single round) with no prior context or examples of code given. In total, the prompt itself must've been a single paragraph long, and simply asked for a nicely designed and usable logo maker / generator that had export options and good styling options. Nothing was specified, and at the time, font management wasn't decided on a feature yet.

Unfortunately, the original plan was to utilize Aider, one of the more widely supported (updated) and widely used libraries for generative AI and coding. Aider advertises itself as the AI pair programmer assistant. It feels like you may use vibe coding to use Aider, but the act of using Aider itself isn't necessarily vibe coding, nor is it an inherent act in any interaction with a LLM unless there's an intentional collaborative framework done by the user. In other words, vibe coding is applicable when it has to be a user that's testing the LLM's suggested coding changes and verifying the output. It is not the user asking the LLM for code which the user then goes through and rewrites to fit into their system / codebase.

But it's also tricky, because you can go "in and out" of vibe coding like state phases. One feature or class or function or even LOC can be "vibe coded", which simply should just imply the act of delegating more responsibility to the LLM to produce some working functionality than what the user assigns themselves. The dev becomes the pair programmer, instead of Aider, per se, being your pair programmer.

![Aider interface](/assets/blog/this-is-aider.png)
*Aider interface*

That said, the reason why vibe coding wasn't done through Aider simply had to do with the implementation of the newest upgrades of Aider itself. It was simply my / our team's personal experience that the far older versions of Aider provided much more usable functionality. We did make a solid attempt as Aider can edit and write files directly on the file system (as can some extensions in VS Code, Cursor, and other frameworks, but here we're just focusing on Aider as it seems like the current strongest contender), but after the first several edits we noticed functionality getting worse. But as we'll get into soon, this type of thing is by no means an issue exclusive to Aider and programming aide tools like it. It's an issue that naturally comes with the usability of all these LLMs, when we make the decision on interacting with them via an app, or via the website, or via the API, or via an agent API, etc., etc.

So we took the original lines of code we were given by Aider (what you saw above in the first iteration), and sent it to Claude Sonnet 3.7, and what was supposed to be a 2 hour project became a 2 day project which became a 10 day project.

![Hello darkness my old friend](/assets/blog/logomaker-claude-horror-chat-history.png)
*Hello darkness my old friend*

This is only the conversations list on Anthropic's Claude's UI (since this is the nicest looking and one with the most organized search). We used OpenAI's ChatGPT and Google Gemini's Pro paid plans, not just to test and compare, but because we had to. This thing still isn't done fully bug-free after 10 days!

Don't want to add any new classes or fix any functions fully by hand, when we know darn well what needs to be fixed and what the LLM is continually doing and redoing wrong over and over again? That's not quite the vibe we're hoping to catch from the vibe coding experiment.

## How to vibe with vibe coding vibes?

![This type of prompt is not completely recommended but probably works well enough. Actually the curtness was intentional to see if Claude could extrapolate better functionality from just short instructions, which is how most casual users would try this, compared to something in-depth.](/assets/blog/logomaker-claude-demonstrates-coding-ability-1.png)
*This type of prompt is not completely recommended but probably works well enough. Actually the curtness was intentional to see if Claude could extrapolate better functionality from just short instructions, which is how most casual users would try this, compared to something in-depth.*

Claude generally always generates files in the right format, whether it's JavaScript, Python, Markdown, etc. Gemini does a great job with this too, though Anthropic's UI / UX far outclasses Gemini.

![Claude's response showing code generation capabilities](/assets/blog/logomaker-claude-demonstrates-coding-ability-2.png)
*Claude's response showing code generation capabilities*

You see we hit limits with Claude, of course, as we still desperately cling to the hope that we can just keep this constrained in one file, and be usable enough to be fun and decent. Plus, let's just see how far we can push these generations. Claude says we can just say "continue" and it'll work. Will it? (Hint: It didn't for OpenAI's GPT-4o models oftentimes, but Anthropic's UI is king as we've said).

![Getting closer, but we're still not quite there yet..](/assets/blog/logomaker-claude-demonstrates-coding-ability-3.png)
*Getting closer, but we're still not quite there yet..*

Alright, let's just.. continue..

![Getting closer, but we're still not quite there yet..](/assets/blog/logomaker-claude-demonstrates-coding-ability-4.png)
*Getting closer, but we're still not quite there yet..*

Okay, we started out with an 850 line file that actually gave us a fully functional app. Working PNG renders and working logos. This did prove my original theory and that I'm not completely delusional. I said to myself I've been wasting so much time in dead end dark patterns trying to find a free logo generator just to do some fun experimenting with, that it might be more efficient just to vibe code one and like ~magic~ it appears.. And to prove it, I got a fully working app (HTML with inline CSS / JS counts!) in 1-3 prompts from Aider using GPT-4o, that's incredibly limited and minimal sure, but truthfully did offer more functionality than the "free" demos these other sites were offering. And while that was written with Aider at first, the underlying LLM models are the same, and without a doubt (at the moment), in my experiences, OpenAI does a much superior job in responding to the user through the UI than giving the same prompt to the same model in Aider.

And after asking Claude to simply improve it, we were left with almost double the LOC! But it doesn't compile because it's not finished, so we can't use it. And despite what Claude says in the UI, we are simply unable to continue any further, with this line of prompting ("continue"), to progress.

We know Claude and OpenAI can go into context windows of 100-200k, but apparently, that seems to only be in the Extended Mode. So what does this "continue" button even do? And what is this "Extended Mode", is this what we're forced into since the "continue" button doesn't work? Is it summarizing my conversation? Is it using Claude again to summarize my conversation? Is it aggregating the last 10 or so messages or however many until it reaches a predetermined limit (and how does it determine this limit, is it limiting my output window size thus limiting the ability for me to use Claude for pair programming?)?

Outputs for LLMs are typically capped at 8,192 tokens, which is highly standard (as well as a completely arbitrarily defined number, one that can easily be extended by these respective API / LLM providers, and oftentimes is). The context windows are the same.

## The real world, the real problems

The more relevant issue here is just how confusing and opaque these tools and the additional options being offered to us work. These are features that are actively costing us money. And time. So a lot of money actually (for a lot of working engineers). When I use ChatGPT-4.5, the more expensive model and take the time to move my conversational context and project info there, and accept the eventual price hikes that will come with these "upgrades" (surely, when they do..), I want to know what this is doing better, and maybe more importantly, why? Why is this model better, so I can actually make an informed decision on what to use? If I use X many calls from this model, am I limited then in my calls to other models? Oh no, I have to ask ChatGPT how much it costs to use ChatGPT?

![I wasn't told I had hit my rate limit, or was coming anywhere near it during this conversation. Claude again has a better UX experience here as they warn you when you are beginning a long conversation that will quickly eat up your available credits](/assets/blog/chatgpt-o1-you-hit-rate-limit.png)
*I wasn't told I had hit my rate limit, or was coming anywhere near it during this conversation. Claude again has a better UX experience here as they warn you when you are beginning a long conversation that will quickly eat up your available credits*

Here's the distinction between a bug / error that's okay and one that's totally not. This is not a rate limit in the output of tokens generated, as in, it hit a limit in writing the script I asked for, had to stop, and would or could potentially continue finishing writing that script once my usage had renewed.

No, OpenAI's UI simply did not respond when I inputted my prompt to patiently await the LLM's response. Now this normally isn't an issue, and I swear I can remember ChatGPT's UI even used to say to just re-enter (nothin) in the chat window if no output was shown. But, when you are charging "premium" access for models, and heavily rate-limiting traffic to the point where every message has value, every few hours of waiting and refreshing of credits (in the case of Claude) is something to watch out for so you can continue utilizing these innovative tools, you can't simply not show a response, and not show why. You as the organization and provider should eat the cost and re-generate, even despite the fact that it damages the conversational flow, memory, and context window, because at least then you allow the user to continue on with developing without introducing roadblocks that are inherent to the tools that you are asking themselves to essentially marry themselves to as they get far enough along in development.

The nice thing about Google's UI with Gemini? Despite it being an absolute menace, resource hog that somehow is 10x slower on Chrome than Firefox for me, and an all-around eyesore, is when there's no response for an output, you can at least select an arrow button that shows the reasoning the LLM took to create that.. null or empty response. And that reasoning at least gives you a better understanding of what the LLM was "thinking" and oftentimes exactly what it was going to send to the user as its final output. It just like, chose not to?

![By selecting the Show thinking button, you can see the exact reasoning the LLM is taking (note: it could be a series of calls as we have no transparency to what is happening in the web UI of Gemini) to answer. Which, oftentimes shows you the expected answer it was going to give but somehow didn't. Seeing as these issues are parallel across different LLM web UIs (OpenAI, Claude, and Gemini) through testing, the issue most likely seems inherent to LLM architecture and response mechanisms.](/assets/blog/google-gemini-pro-show-thinking-1.png)
*By selecting the Show thinking button, you can see the exact reasoning the LLM is taking (note: it could be a series of calls as we have no transparency to what is happening in the web UI of Gemini) to answer. Which, oftentimes shows you the expected answer it was going to give but somehow didn't. Seeing as these issues are parallel across different LLM web UIs (OpenAI, Claude, and Gemini) through testing, the issue most likely seems inherent to LLM architecture and response mechanisms.*

![Google Gemini Pro's thinking feature in action](/assets/blog/google-gemini-pro-show-thinking-2.png)
*Google Gemini Pro's thinking feature in action*

And for comparison's sake, ChatGPT's UI is by far the least consistent in terms of delivering consistent file formatting. ChatGPT finds it actually IMPOSSIBLE to deliver a single markdown file without messing up its formatting. Kidding, as it's likely just the devs behind this wilding entity messing up the building the UI empowering it to exist.

![ChatGPT's inconsistent markdown formatting](/assets/blog/chatgpt-not-markdown.png)
*ChatGPT's inconsistent markdown formatting*

That's not the file fully in markdown actually. Markdown should just literally look like a text file with special formatting characters.

![More markdown formatting issues with ChatGPT](/assets/blog/chatgpt-not-markdown-2.png)
*More markdown formatting issues with ChatGPT*

That's also, just partially markdown, not all markdown.

![ChatGPT giving a "full" refactored file from a script that was originally 1500 lines of code in JS](/assets/blog/chatgpt-not-giving-full-file.png)
*ChatGPT giving a "full" refactored file from a script that was originally 1500 lines of code in JS*

That's ChatGPT giving me a "full" refactored file from a script that was originally 1500 lines of code in JS (don't judge, this is an LLM-generated or "vibe-coded" project remember?). It refactored it into 200 lines. It refactored like losing weight by cutting a limb off. Claude runs into the same issues we've seen earlier with its "continue" limit, which genuinely seems to be a UI limitation, which is very unfortunate, as Sonnet 3.7 (at the moment) was doing great work up until it hit its limits. Gemini Pro 2.5? This was the only model capable of generating a full ~2000 LOC file coherently with minimal hallucinations in one go.

Here is a hint with ChatGPT, our OG LLM provider. If it asks you "Would you like this answered in chat?", instead of it writing in a file in a text editor inside the chat window (which is what would be happening here), you click on that thing as soon as you're able to before this other terrifying UI feature starts controlling your conversation and showing files rendered in the most unclear way.

Though, I must emphasize, at the moment, as with anything with these APIs and providers, it seems everything is always subject to change, sometimes even at the whim of competitors:
- [Google really wants to punish OpenAI for that one](https://www.reddit.com/r/Bard/comments/1idmqul/google_really_wants_to_punish_openai_for_that_one/)
- [OpenAI plans to announce Google search competitor](https://www.reddit.com/r/technology/comments/1co9lcg/openai_plans_to_announce_google_search_competitor/)
- [Google faked the release date for the updates](https://www.reddit.com/r/OpenAI/comments/1e8mfmx/google_faked_the_release_date_for_the_updates_and/)

Somehow this transparency of showing thinking / reasoning from Gemini Pro also demonstrates the fundamental lack of transparency these platforms by design invite. Why show me the thought process if I don't understand how that thinking works? Is it just like, 4 API calls on top of each other? Does that mean it uses 4x as many "credits" as I would have in my plan then?

Devs behind these providers may just try new features or A/B experiments, and you might not have any idea about a change until it starts to go trending on Reddit, Twitter, etc.
- [Was GPT-4o nerfed again?](https://www.reddit.com/r/OpenAI/comments/1jlwhs0/was_gpt4o_nerfed_again/)
- [Boys what OpenAI did to this model](https://www.reddit.com/r/singularity/comments/1gy7p1d/boys_what_openai_did_to_this_model/)
- [OpenAI nerfing GPT feels like a major downgrade](https://www.reddit.com/r/ChatGPT/comments/1iu237v/openai_nerfing_gpt_feels_like_a_major_downgrade/)
- [Hacker News discussion on nerfing](https://news.ycombinator.com/item?id=40077683)
- [Claude 3.7 Max been nerfed?](https://forum.cursor.com/t/claude-3-7-max-been-nerfed/73840)
- [Whenever people say X model has been nerfed it's almost always complete bulls**t](https://www.threads.net/@sobri909/post/DH-P4irxjrU/yeah-whenever-people-say-x-model-has-been-nerfed-its-almost-aways-complete-bulls)
- [Hacker News item 41327360](https://news.ycombinator.com/item?id=41327360)
- [Twitter discussion on model changes](https://x.com/samim/status/1876005616403300582)

It's clear the user community around AI has a lot of fears that don't involve becoming obsolete by singularity or automation. Users are heavily embracing generative AI, at an almost alarming rate.

![Scene from the movie "Her" by Warner Bros](/assets/blog/her-movie-screenshot-warner-bros.png)
*Scene from the movie "Her" by Warner Bros*

And we're still left in the dark in other ways. How much of a competitive edge do companies like OpenAI and Anthropic get when they can internally adjust the outputs and filters / censors of their models at will? How much access is available for large organizations (governments, banks, hedge funds, or huge tech companies with their own silos like Oracle, Microsoft) to "buy" control, even temporary or one-time arrangements, over these inputs and outputs that are completely black-box to your average user?

![The live site of Logomaker, at https://manicinc.github.io/logomaker, which will live here free forever so long as GitHub Pages is free.](/assets/blog/logomaker-live-site.png)
*The live site of Logomaker, at https://manicinc.github.io/logomaker, which will live here free forever so long as GitHub Pages is free.*

This app was built as an experimental work to test the current capabilities of different LLMs as well as their providers and the accompanying UI features serviced by them. It's meant as a fun, useful, and chaotic work where the dev was fully dedicated to just using vibe coding, or allowing the LLM to generate code and functions with detailed and clear technical guidance. Individual small fixes for issues from the LLM providers (the code given out in the UIs) were fixed sometimes with GitHub Co-Pilot for convenience's (and budget) sake.

Originally, the hope was to get this whole thing done in just 1 HTML file! And not take so many multiple days (working on and off) to finish up. And it was, in just a few prompts too. We'll post that as a snippet here: [coming-soon](coming-soon). But, it just seemed like every new feature was just a quick prompt or two away, and so on, and so on, and..

So one day, we had an intelligent [font management system](#) that could lazily load gigabytes of fonts in a speedy way, a [build setup](#) that worked with our other [portapack-package](#) and could [compile](#) into an Electron app, a live dev workflow.

Then the next day, we had full SVG support. And not just support for static SVGs, but actual animations! Something really difficult to pull off in imaging applications, and something I had never even thought about (or had any idea on how to implement, as all those algorithmic and style building / XML techniques were done by the LLM, with no external sources / documentation given for reference).

And so on and on with each passing day, until a 2 hour project became a 2 day project which became a 10 day project which is the full-fledged design playground application you see linked below.

We kept things simple, static assets, all client-side rendering, no server required to run the app (not necessarily, anyway, as we have a multitude of building / running options), and, just JavaScript. No TypeScript, unit tests, or refactoring that wasn't done on-the-fly. This wasn't a scientific experiment, but given every function was definitively written by an LLM (by intention), it's safe to say well over 90% of the codebase was done by generative AI. At least 80% of the docs you see in the repo were written by generative AI. And 0% of this article was written by generative AI.

What do you think about the source code, designs, and end results that these large language models, these AI assistants, these slaves workers collaborators agents did?

- [Live Demo: https://manicinc.github.io/logomaker](https://manicinc.github.io/logomaker)
- [GitHub Repo: https://github.com/manicinc/logomaker](https://github.com/manicinc/logomaker)