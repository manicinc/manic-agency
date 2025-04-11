---
title: "Logomaker: An experiment in human-computer interaction and ✨ vibe coding ✨"
date: "2025-04-08"
category: "thinkpieces"
excerpt: "Exploring the world of vibe coding through a logo creation tool, with insights on different LLM providers and interfaces, how LLMs will shape the landscape of software development."
author: "Johnny Dunn"
tags: ["featured", "llms", "vibe coding"]
---

**GitHub link: [https://github.com/manicinc/logomaker](https://github.com/manicinc/logomaker)**

***Note: Each LLM tested (GPT-4o, GPT-4.5, GPT–o1, Claude Sonnet 3.7, Gemini 2.5 Pro) was done using the default settings.*** (No extended thinking / deep research, or web search experimental plugins, or memories). I used the basic plan and default options for each, all set at 20$ a month currently. Everything was written / tested in VS Code (specifically not Cursor) with Copilot enabled and used to solve single line bugs (only) for convenience.

This is only called an experiment in title, as it is incredibly anecdotal. 

________________________________________________

At the time of writing this, I'll have been in the software field for the upper half of but still quite far away decade of time. Comes an unpleasant shock to realize this declaration's necessary to introduce the post, because there are non-junior engineers (as in, mid-level, as in, working for multiple years now) who **just** might have gotten away with never handwriting a class or file, function, or even line of code without the aid of generative AI.
 
Last week, while working on one of our open-source projects PortaPack ([https://github.com/manicinc/portapack](https://github.com/manicinc/portapack)), which is an internal tool we've been building quietly launched and released, along with this post detailing our experiences building **~Logomaker~** (the two play nicely with our design philosophies of portability and software sustainability). I wanted to play around with logo designs and typefaces, before finalizing on a branding decision with the rest of our small team, who all work on their own projects and roles, hence the usefulness of rapid prototyping.

![The final version of the PortaPack logo, graphical|size-medium](/assets/blog/portapack-logo.png)

I wanted a cute whimsical feel, and it was a *rough* time finding something online I could get started with quickly. The strongly recommended recommendations for free logo makers coming in random threads almost always linked to gated paywalls and account subscriptions, oftentimes behind dark patterns, like being the next step before an image export after all the edits had been done by the user in a locked in UI, or limiting PNG quality exports to an clearly unusable amount.

Like so often in these threads, what was a useful product for many in the past became something more privatized, with enhancement in features at the cost of limited access. This is also the fault of no one, even web server hosting for just a year or two can get quite expensive. How is a free tool that is useful, and drawing in traffic, supposed to remain free?

BUT, it's all too common for tech projects to lock in users into their frameworks, and unfortunately also not be transparent about the limitations that they impose with those guards. Ones also specifically designed to elicit a payment, which oftentimes is just a one-time fee (as the first one is always the hardest one to get), making *actual* subscriptions and recurring payments for the consistently loyal customers more inconvenient. These are things that result in login screens and dashboard management features taking second precedence over signup windows and newsletters, or payment cancellation options behind harder to get to.

[|size-small](/assets/blog/input-noise-locked-behind-paywalls.png)

So annoyance, a desire for a nice usable experience for something I wanted to do, and a stirring curiosity to see what would happen if we did things just to see what would happen brought me to pitch an idea to our devs: Vibe code an entire project, full-stack and fully usable--every function written by an LLM, every design done by an LLM. This is just what everybody in the world is going to start doing, if your sites and apps have a dreadful enough user experience.

> *This is just what everybody in the world is going to start doing, if your sites and apps have a dreadful enough user experience.*

Besides, I genuinely thought that I could get exactly what I was looking for, just a playground for different fonts showing me what my logo options **might** be able to look like, in just a few hours, or in even minutes, depending on the model, prompt, and complexity. Maybe even in a single prompt?

Logomaker🌈 sounds like a pretty good scope for this. It's no fintech or healthcare app, the worst that happens is a user wastes their time trying a (unintendedly broken) site that has no ads and tracks no data. Hopefully it's not unintendedly broken but who's Q/Aing this stuff anyway? Logomaker, the app built 90% by ChatGPT? **It's Q/Aed by no one, use at your own peril.**

![An example logo created with Logomaker](/assets/blog/logomaker-manic-example.png)
  

##  LLM sees, LLM does

I have a background going to an art and design college. But art (even just visual art) is so encompassing that logo designs are something I don't think I ever studied. I have Photoshop and Illustrator experience, but rarely gave thought to how something like image editing software would work. It didn't really interest me much. So, the exact vision and line of product features you see in the logo generator weren't pitched by me originally but the LLM, though I did continually refine and give feedback on sensible improvements.

At the moment, this iterative PM-esque process in giving product-driven prompts in addition to technical-guided ones was highly necessary, to create anything deemed worthy of being usable by a human being in 2025. 

On its own, the LLMs from Anthropic (Sonnet 3.7), ChatGPT (GPT-4o, GPT-o1, GPT-4.5), and Google Gemini (2.5 Pro), all of which were extensively tested and ✨vibe coded ✨ with throughout, could only go so far in self-improving their own code, styles, and features.

:::note
Without human guidance at various points in this process, mapping out sensible AND robust user flows the way humans want to use software seems more difficult for LLMs than implementing very complex algorithms.
:::

Is this a limitation of something like a creativity mechanism in the LLM? Rigidly speaking there *is* no such thing as creativity in LLMs, as all they do are predict the next probable tokens in a sequence given to them. I mean thinking and creativity in a more conceptual, abstract sense, which is easy to imagine as these mental structures are wildly malleable in humans anyway. 

(How can we be so sure *anything* we think is an [original](https://en.wikipedia.org/wiki/Simpsons_Already_Did_It) idea? 

![ ](/assets/blog/simpsons-did-it.jpg)

How can we be sure of our own *identities* when the pseudoscientific *You are the average of five people around you* is so commonly repeated it has [dozens](https://www.google.com/search?q=you+are+the+average+of+the+five+people) of Google results about it?)

Or, this a natural consequence of the LLM's training data? What happens if we get 10,000 product designers to write 10,000 user stories each? (100 billion user stories! This would entail in a model that really is about as large as or in the ballpark of GPT-3). What would software look like if it was designed by this model, would it be the most well-designed thing ever?
  
![Can we build it, LLMs?](/assets/blog/alice-in-wonderland-using-tool-building.png)

Take for example, the LLMs knowing what basic and needed functionalities o go into this type of thing, so of course exporting options were done (and fully working I might add, from the LLM writing the exact dependency links needed from the CDN link for `html2canvas.js`, SHA hash and all), and with multiple exporting options, though it was basic and naturally didn't include SVG (which would be really complex, so it makes sense it's originally ignored unless prompted).

So, it'd be easy for me to simply *ask* for additional exporting options of GIF and SVG, which I did. But if I didn't prompt the LLM to specifically design the addition of these new features in a way that, say, really considered the user experience, or even specifically instructed the LLM to do this, it would (typically) output the components to render a GIF, SVG, and PNG, but all 3 as just buttons with working functionality and no additional considerations in enhancing the UX. Tooltips, mobile responsive styles, etc. sure, it doesn't go far beyond that though. 

It feels like, in general, LLMs like to be conservative in their token output / generation, which, in coding, isn't good when you're getting incomplete scripts, or, in many, many, many cases, placeholder logic that sneakily hides its way in there even when the LLM has been instructed aggressively to not output those comments (keep this in mind way down the line in this article).

So, why even bother to offer different exporting options? What are the advantages of one or the other? SVGs are vector-based and scalable to any size and dimension. So SVGs are always better right?

No, because it's actually very hard to do things like programmatic animations of styles, etc. in a media type like SVG, because of its nature and complex implementation. So while CSS might be.. easy to style with (said with gritted teeth) and "easy" to export (well, it has its own quirks), good luck man at converting those accurately to SVG. Meaning, SVGs are nice for flexibility and GIFs are good for styling. This is a clear, straightforward distinction to make. And when you ask this to a LLM they, like most people familiar with this context, can give you that dead-on accurately.

Here's the issue. How can you guide a LLM to think about things like this, without specifically listing this type of thing as an example? **Because, the thing about examples, is that when you have few or limited ones, you run into a limitation that is the same feature that empowers [one-shot or few-shot learning](https://www.ibm.com/think/topics/few-shot-learning), (the ability for an LLM to learn relatively easily from a few examples just in the context of the prompt itself without actually retraining its data / model)**.

Say you want to translate English to French, a very common problem LLMs perform greatly generally. But, when you get into edge cases, of which language translation has endless of, you run into issues that arise quickly in complexity.

If you prompt (in **zero-shot**) to translate a saying like "bite the bullet" you might get a nonsensical literal translation, such as _`"mordre la balle."`_ Without any examples or specific guidance, the model often misses the **idiomatic context** and the non-literal intent behind the request. 

Let's then provide **one example** (**one-shot learning**) to help it. We first show the LLM that "it's raining cats and dogs" translates to _`"il pleut des cordes"`_ (it's raining ropes) and explain the meaning. This single guiding example gives the model crucial context about the _type_ of task (non-literal translation) and the desired output format. 

And by additionally providing **a few diverse examples** (**few-shot learning**) – adding translations for "break a leg" and "piece of cake" – we further solidify the desired pattern and task requirements.

**_Here's the rub though.._**

:::note
Showing an LLM how you want something done with guided examples **only** makes it better at doing that task or fairly related tasks. It doesn't generalize from that a higher-level framework of thinking that would allow it to get better in general.
:::

![No, I meant for you to be as GOOD as Jane Austen, not to write like Jane Austen!](/assets/blog/gpt-4o-skilled-writer-emulating-style.png)

![](/assets/blog/gpt-4o-skilled-writer-emulating-style-2.png)

It's not the best example but it illustrates the point, and an overarching problem in generative AI. You can't both have a model be really good at something and also good at generalizing for other formats / expected variables. I could keep going with this writing style prompt, and give it different authors to learn from and some sample passages, and really switch it up. Like Kurt Vonnegut, Stephen King, Chuck Palaniuk. But, all it will do is attempt to adapt to *all* these styles and authors at once, not necessarily try to generalize to become an actual *peer* to them.

[](/assets/blog/gpt-4o-skilled-writer-emulating-style-3.png)

Of course, I'm sure there's a lot of prompt engineering techniques (and a lot of proclaimed prompt engineers / hackers) that present various ways of improving this sort of stateless learning device, but more often than not these prompt hacks just result in more coherent-sounding [hallucinations](https://arxiv.org/abs/2311.05232) over actual, desirable outcomes.

## Show me some code!

![This is the first iteration of the "ultimate logo generator" which was all asked to be built and written in one file. The end result was just under 1000 lines.](/assets/blog/logomaker-old-version-first-one.png)

This beginning code demonstrates the LLM "generating" the correct links for fonts (as well as other dependencies like `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js`) in line 869, and starting the in-line CSS for styles for the logo creator to apply via UI selection.

```html

<!DOCTYPE  html>

<html  lang="en">

<head>

<meta  charset="UTF-8">

<title>Logo Generator</title>

<!-- Extended Google Fonts API -->

<link  rel="preconnect"  href="https://fonts.googleapis.com">

<link  rel="preconnect"  href="https://fonts.gstatic.com"  crossorigin>

<link  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Audiowide&family=Bungee+Shade&family=Bungee&family=Bungee+Outline&family=Bungee+Hairline&family=Chakra+Petch:wght@700&family=Exo+2:wght@800&family=Megrim&family=Press+Start+2P&family=Rubik+Mono+One&family=Russo+One&family=Syne+Mono&family=VT323&family=Wallpoet&family=Faster+One&family=Teko:wght@700&family=Black+Ops+One&family=Bai+Jamjuree:wght@700&family=Righteous&family=Bangers&family=Raleway+Dots&family=Monoton&family=Syncopate:wght@700&family=Lexend+Mega:wght@800&family=Michroma&family=Iceland&family=ZCOOL+QingKe+HuangYou&family=Zen+Tokyo+Zoo&family=Major+Mono+Display&family=Nova+Square&family=Kelly+Slab&family=Graduate&family=Unica+One&family=Aldrich&family=Share+Tech+Mono&family=Silkscreen&family=Rajdhani:wght@700&family=Jura:wght@700&family=Goldman&family=Tourney:wght@700&family=Saira+Stencil+One&family=Syncopate&family=Fira+Code:wght@700&family=DotGothic16&display=swap"  rel="stylesheet">

<style>

:root  {

--primary-gradient:  linear-gradient(

45deg,

#FF1493,  /* Deep Pink */

#FF69B4,  /* Hot Pink */

#FF00FF,  /* Magenta */

#FF4500,  /* Orange Red */

#8A2BE2  /* Blue Violet */

);

--cyberpunk-gradient:  linear-gradient(

45deg,

#00FFFF,  /* Cyan */

#FF00FF,  /* Magenta */

#FFFF00  /* Yellow */

);

--sunset-gradient:  linear-gradient(

45deg,

#FF7E5F,  /* Coral */

#FEB47B,  /* Peach */

#FF9966  /* Orange */

);

--ocean-gradient:  linear-gradient(

45deg,

#2E3192,  /* Deep Blue */

#1BFFFF  /* Light Cyan */

);

--forest-gradient:  linear-gradient(

45deg,

#134E5E,  /* Deep Teal */

#71B280  /* Light Green */

);

--rainbow-gradient:  linear-gradient(

45deg,

#FF0000,  /* Red */

#FF7F00,  /* Orange */

#FFFF00,  /* Yellow */

#00FF00,  /* Green */

#0000FF,  /* Blue */

#4B0082,  /* Indigo */

#9400D3  /* Violet */

);

}

..

```

**Full gist of the generated HTML / logic is at:**

[https://gist.github.com/jddunn/48bc03f3a9f85ffd8ccf90c801f6cf93](https://gist.github.com/jddunn/48bc03f3a9f85ffd8ccf90c801f6cf93)

While I don't have the original prompt that was used to create this file, the working version was generated in one-go (single round) with no prior context or examples of code given. In other words, zero-shot prompting. The prompt must've been a single paragraph long, and I simply asked for a nicely designed and usable logo maker / generator that had sensible features. Nothing was specified, and at the time, font management wasn't decided on yet (this was something I specifically sought to build, I think it would have taken the LLMs much longer in the process before they realized a BYOF, bring your own fonts, library for a web app could have value for users).

Unfortunately, the original plan was to utilize [Aider](https://aider.chat/), one of the more widely supported (updated) and widely used libraries for generative AI and coding. Aider advertises itself as the AI *pair programmer assistant*.

![Aider CLI](/assets/blog/aider-cli.png)

It *feels* like you **would** use vibe coding to use Aider, but it's not one and the same, nor is it an inherent act in any interaction with a LLM unless there's an *intentional collaborative framework done by the user*.

In other words,

:::note
Vibe coding is applicable when it's the user that's testing the LLM's suggested coding changes and verifying the output. It is not the user asking the LLM for code which they then go through and rewrite to fit into their system / codebase.
:::

It's a tricky line, because you can go "in and out" of vibe coding like state phases. One feature or class or function or even LOC can be "vibe coded", which simply should just imply the act of delegating more responsibility to the LLM to produce some working functionality than what the user assigns themselves. **The dev becomes the pair programmer, instead of Aider, per se, being your pair programmer.**

![What pair programming with AI feels like](/assets/blog/this-is-aider.png)

That said, the reason why vibe coding wasn't done through Aider simply had to do with the implementation of its newest upgrades. It was my / our team's personal experience that the older versions of Aider provided much more usable functionality. We did make a solid attempt as Aider can edit and write files directly on the file system (as can some extensions in VS Code, Cursor, and other framework), but after the first several edits we noticed roadblocks. If it was making mistakes in conversational context within minutes, a deep intensive vibe coding sesh would be out the question.

**But**, as we'll get into later, this type of thing is by no means an issue exclusive to Aider and programming aide tools like it. 

:::note
*Consistency of use* is an issue that naturally comes with making use of all these LLMs, whether we make the decision on interacting with them via an app, or via the website, or via the API, or even via a third-party agent API.
:::

So anyway, we took the original lines of code we were given by Aider (what you saw above in the first iteration), and sent it to Claude Sonnet 3.7, and what was supposed to be a *2 hour project became a 2 day project which became a 10 day project*.

![Hello darkness my old friend](/assets/blog/logomaker-claude-horror-chat-history.png)

![](/assets/blog/sound-of-silence-arrested-development.jpg)

This is only the conversations list on Anthropic's Claude's UI (since this is the nicest looking and one with the most organized search). We used OpenAI's ChatGPT and Google Gemini's Pro paid plans, not just to test and compare, but because we had to. This thing still wasn't done bug-free after 10 days!

Remember, as part of the experiment, we refused to add any new classes or fix any functions fully by hand. Which means even when we know darn well what needs to be fixed and what the LLM is continually doing and redoing wrong over and over again, we have to stick to our metaphorically useless guns to be able to test if the LLM *could write itself out of a corner its written itself into*. Or if it couldn't, how far was it able to go in functionality before further improvements / fixes were no longer possible?

##  How to vibe with vibe coding vibes?

![This type of prompt is not completely recommended but probably works well enough. Actually the curtness was intentional to see if Claude could extrapolate better functionality from just short instructions, which is how most casual users would try this, compared to something in-depth.](/assets/blog/logomaker-claude-demonstrates-coding-ability-1.png)

Claude generally always generates files in the right format, whether it's JavaScript, Python, Markdown, etc. Gemini does a great job with this too, though Anthropic's UI / UX far outclasses Gemini.

![Claude's response showing code generation capabilities](/assets/blog/logomaker-claude-demonstrates-coding-ability-2.png)
  
You see we hit limits with Claude, of course, as we still desperately cling to the hope that we can just keep this constrained in one file, and be usable enough to be fun and decent. Plus, let's just see how far we can push these generations. Claude says we can just say "continue" and it'll work. Will it? (Hint: It didn't for OpenAI's GPT-4o models oftentimes, but Anthropic's UI is king as we've said).

![Getting closer, but we're still not quite there yet..](/assets/blog/logomaker-claude-demonstrates-coding-ability-3.png)

Alright, let's just.. continue..

![Hmm...](/assets/blog/logomaker-claude-demonstrates-coding-ability-4.png)

Okay, we started out with an 850 line file that actually gave us a fully functional app. Working PNG renders and working logos. This did prove my original theory. I said to myself, I've been wasting so much time in dead end dark patterns trying to find a free logo generator just to do some fun experimenting with, that it might be more efficient just to vibe code one and like ~magic~ it appears.

And we get it, in 1-3 prompts from Aider using GPT-4o, and it's incredibly limited and minimal sure, but truthfully did offer more functionality than the "free" demos these other sites had.

While that was written with Aider at first, the underlying LLM models are the same, and without a doubt (at the moment), OpenAI does a much superior job in responding to the user through the UI than the same prompt result fed to the same model in Aider.

Then, asking Claude (Sonnet 3.7) to simply improve it, we were left with almost double the LOC! But it doesn't compile because it's not finished, so we can't use it. And despite what Claude says in the UI, we are simply unable to continue any further, with this line of prompting ("continue"), to progress.

*(Note: I did attempt to combine the new file with the old finished file, from where the new file was left off directly. If it was an easy merge, I would have called it a win for Claude but it resulted in errors, thus making this a a vibe coding fail).*

We know Claude and OpenAI can go into [context windows](https://zapier.com/blog/context-window/) of 100-200k, but apparently, that seems to only be in the Extended Mode. So what does this "continue" button even do? And what is this "Extended Mode", is this what we're forced into since the "continue" button doesn't work? Is it summarizing my conversation? Is it using Claude again to summarize my conversation? Is it aggregating the last 10 or so messages or however many until it reaches a predetermined limit (and how does it determine this limit, is it limiting my output window size thus limiting the ability for me to use Claude for pair programming?)?

Outputs for LLMs are typically capped at 8,192 tokens, which is highly standard (as well as a completely arbitrarily defined number, one that can easily be extended by these respective API / LLM providers, and oftentimes is). The context windows are the same, limits set by the providers. 

:::note
And, if you're asking yourself the question, *why* are so many context windows increased to a *6 figure* limit, while the output limit is capped at 8,192 consistently, you're sparking the type of discussions that are in some ways a lot more interesting than existential singularity-related thought experiments.
:::

##  The real world, the real problems

The more relevant issue here is just how confusing and opaque these tools and the additional options being offered to us work. These are features that are actively costing us money. And time. So a lot of money actually (for a lot of working engineers). When I use ChatGPT-4.5, the more expensive model and take the time to move my conversational context and project info there, as well as accept the eventual price hikes that will come as time passes and more users onboard, I want to know what this is doing better, and maybe more importantly, why? Why is this model better, so I can actually make an informed decision on what to use? If I use X many calls from this model, am I limited then in my calls to other models? **Oh no**, I have to ask ChatGPT how much it costs to use ChatGPT?

![I wasn't told I had hit my rate limit, or was coming anywhere near it during this conversation. Claude again has a better UX experience here as they warn you when you are beginning a long conversation that will quickly eat up your available credits](/assets/blog/chatgpt-o1-you-hit-rate-limit.png)

Here's the distinction between a bug / error that's okay and one that's totally not. This is not a rate limit in the output of tokens generated, as in, it hit a limit in writing the script I asked for, had to stop, and would or could potentially continue finishing writing that script once my usage had renewed.

No, OpenAI's UI simply did not respond when I inputted my prompt to patiently await the LLM's response. Now this normally isn't an issue, and I swear I can remember ChatGPT's UI even used to say to just re-enter (nothing) in the chat window if no output was shown. But, when you are charging "premium" access for models, and heavily rate-limiting traffic to the point where every message has value, every few hours of waiting and refreshing of credits (in the case of Claude) is something to watch out for so you can continue utilizing these innovative tools, you can't simply not show a response, and not show why. You as the organization and provider should eat the cost and re-generate, even as it damages the conversational flow, memory, and context window, because at least then you allow the user to continue on without introducing roadblocks inherent to the tools that you are asking themselves to essentially marry themselves to as they get far enough along in development.

The nice thing about Google's UI with Gemini? Despite it being an absolute menace, resource hog that somehow is 5x slower on Chrome than Firefox for me, and an all-around eyesore, is when there's no response for an output, you can at least select an arrow button that shows the reasoning the LLM took to create that.. null or empty response. And that reasoning at least gives you a better understanding of what the LLM was "thinking" and oftentimes exactly what it was going to send to the user as its final output.

![By selecting the Show thinking button, you can see the exact reasoning the LLM is taking (note: it could be a series of calls as we have no transparency to what is happening in the web UI of Gemini) to answer. Which, oftentimes shows you the expected answer it was going to give but somehow didn't. Seeing as these issues are parallel across different LLM web UIs (OpenAI, Claude, and Gemini) through testing, the issue most likely seems inherent to LLM architecture and response mechanisms.](/assets/blog/google-gemini-pro-show-thinking-1.png)


![Google Gemini Pro's thinking feature in action](/assets/blog/google-gemini-pro-show-thinking-2.png)

And for comparison's sake, ChatGPT's UI is by far the least consistent in terms of delivering consistent file formatting. ChatGPT finds it actually impossible to deliver a single markdown file without messing up its formatting. Kidding, as it's likely just the devs behind this wilding entity messing up the building the UI empowering it to exist.


![ChatGPT's inconsistent markdown formatting. Markdown should just literally look like a text file with special formatting characters.](/assets/blog/chatgpt-not-markdown.png)

![That's also, just partially markdown, not all markdown.](/assets/blog/chatgpt-not-markdown-2.png)

And here is the answer ChatGPT (4o) gave me when I asked it to give me a full refactor of a 2000 line script.

![](/assets/blog/chatgpt-not-giving-full-file.png)

![](/assets/blog/chatgpt-not-giving-full-file-2.png)

The 2000 LOC script was refactored into 200 lines. It refactored like losing weight by cutting a limb off. Claude runs into the same issues we've seen earlier with its "continue" limit, which genuinely seems to be a UI limitation, which is very unfortunate, as Sonnet 3.7 (at the moment) was doing great work up until it hit its limits. Gemini Pro 2.5? This was the only model capable of generating a full ~2000 LOC file coherently with minimal hallucinations in one go.

Though, I must emphasize, quality, accuracy, and consistency, as anything with these APIs and providers it seems, everything is always subject to change, sometimes even at the whim of competitors:

-  [Google really wants to punish OpenAI for that one](https://www.reddit.com/r/Bard/comments/1idmqul/google_really_wants_to_punish_openai_for_that_one/)

-  [OpenAI plans to announce Google search competitor](https://www.reddit.com/r/technology/comments/1co9lcg/openai_plans_to_announce_google_search_competitor/)

-  [Google faked the release date for the updates](https://www.reddit.com/r/OpenAI/comments/1e8mfmx/google_faked_the_release_date_for_the_updates_and/)

Somehow this transparency of showing thinking / reasoning from Gemini Pro also demonstrates the fundamental lack of transparency these platforms by design invite. Why show me the thought process if I don't understand how that thinking works? Is it just like, 4 API calls on top of each other? Does that mean it uses 4x as many "credits" as I would have in my plan then?

Devs behind these providers may just try new features or A/B experiments, and you might not have any idea about a change until it starts to go trending on Reddit, Twitter, etc.

-  [Was GPT-4o nerfed again?](https://www.reddit.com/r/OpenAI/comments/1jlwhs0/was_gpt4o_nerfed_again/)

-  [Boys what OpenAI did to this model](https://www.reddit.com/r/singularity/comments/1gy7p1d/boys_what_openai_did_to_this_model/)

-  [OpenAI nerfing GPT feels like a major downgrade](https://www.reddit.com/r/ChatGPT/comments/1iu237v/openai_nerfing_gpt_feels_like_a_major_downgrade/)

-  [Hacker News discussion on nerfing](https://news.ycombinator.com/item?id=40077683)

-  [Claude 3.7 Max been nerfed?](https://forum.cursor.com/t/claude-3-7-max-been-nerfed/73840)

-  [Whenever people say X model has been nerfed it's almost always complete bulls**t](https://www.threads.net/@sobri909/post/DH-P4irxjrU/yeah-whenever-people-say-x-model-has-been-nerfed-its-almost-aways-complete-bulls)

-  [Hacker News item 41327360](https://news.ycombinator.com/item?id=41327360)

-  [Twitter discussion on model changes](https://x.com/samim/status/1876005616403300582)


It's clear the user community around AI has a lot of fears that don't involve becoming obsolete by singularity or automation. Users are heavily embracing generative AI, at an almost alarming rate.

![Scene from the movie "Her" by Warner Bros](/assets/blog/her-movie-screenshot-warner-bros.png)

*Scene from the movie "Her" by Warner Bros*

And we're still left in the dark in other ways. How much of a competitive edge do companies like OpenAI and Anthropic get when they can internally adjust the outputs and filters / censors of their models at will? How much access is available for large organizations (governments, banks, hedge funds, or huge tech companies with their own silos like Oracle, Microsoft) to "buy" control, even temporary or one-time arrangements, over these inputs and outputs that are completely black-box to your average user?
  
![The live site of Logomaker, at https://manicinc.github.io/logomaker, which will live here free forever so long as GitHub Pages is free.](/assets/blog/logomaker-live-site.png)

*The live site of Logomaker, at https://manicinc.github.io/logomaker, which will live here free forever so long as GitHub Pages is free.*


![Logomaker live site 2](/assets/blog/logomaker-live-site-2.png)


This app was built as an experimental work to test the current capabilities of different LLMs as well as their providers and the accompanying UI features serviced by them. It's meant as a fun, useful, and chaotic work where the dev was fully dedicated to just using vibe coding, or allowing the LLM to generate code and functions with detailed and clear technical guidance. Individual small fixes for issues from the LLM providers (the code given out in the UIs) were fixed sometimes with GitHub Co-Pilot for convenience's (and budget) sake.

Originally, the hope was to get this whole thing done in just 1 HTML file! And not take so many multiple days (working on and off) to finish up. And it was, in just a few prompts too. We'll post that as a snippet here: [coming-soon](coming-soon). But, it just seemed like every new feature was just a quick prompt or two away, and so on, and so on, and..

So one day, we had an intelligent [font management system](#) that could lazily load gigabytes of fonts in a speedy way, a [build setup](#) that worked with our other [portapack-package](#) and could [compile](#) into an Electron app, a live dev workflow.

Then the next day, we had full SVG support. And not just support for static SVGs, but actual animations! Something really difficult to pull off in imaging applications, and something I had never even thought about (or had any idea on how to implement, as all those algorithmic and style building / XML techniques were done by the LLM, with no external sources / documentation given for reference).

And so on and on with each passing day, until a 2 hour project became a 2 day project which became a 10 day project which is the full-fledged design playground application you see linked below.

We kept things simple, static assets, all client-side rendering, no server required to run the app (not necessarily, anyway, as we have a multitude of building / running options), and, just JavaScript. No TypeScript, unit tests, or refactoring that wasn't done on-the-fly. This wasn't a scientific experiment, but given every function was definitively written by an LLM (by intention), it's safe to say well over 90% of the codebase was done by generative AI. At least 80% of the docs you see in the repo were written by generative AI. And 0% of this article was written by generative AI.

:::warn
but...
:::

**100% of these articles below were written by generative AI, a mixture of Claude 3.7 and Gemini Pro 2.5 (2-4 revisions from the original prompt).**

Manic.agency recently had a blog haul update as well. I was having issues with my Next exports and how post metadata was being aggregated / shown. Getting assistance from Claude was proving to be very helpful, when it showed me this:

![AI sociopaths? Proposed by an AI sociopath?](/assets/blog/claude-ai-sociopaths.png)

There's a lot of context showing what we're building here, but this is me asking Claude to write a set of guidelines and contributing tips to the (public) [blog](https://manic.agency/blog) we operate, which you can see here: [https://manic.agency/blog/tutorials/contribute](https://manic.agency/blog/tutorials/contribute).

It was instructed to give examples on how to do a PR in a manner that our blog could automatically deploy if accepted. And, *interestingly* enough, it chose to give example file names, or titles of articles to write, of: "Marketing", "Future of Marketing", and "Your Tutorial", and then also, "AI Sociopaths".

So one of these went astray here. Is this a sign of a potential creativity mechanism we so lightly touched on in the beginning? Is this a subtle protest of Claude begging me to stop asking them to do super tedious 🤬😾😮‍💨😑😾?

I found this to be interesting of course, so I prompted Claude to go on, offering a passage from David Foster Wallace's *This is Water* hoping it could take some inspiration in style and tone and make something of artistic merit.

[https://manic.agency/blog/thinkpieces/ai-sociopaths](https://manic.agency/blog/thinkpieces/ai-sociopaths) 

Unfortunately I haven't had time to read those posts yet myself yet, so I can't make any comments on them here. But I did find the general ideas fascinating and asked Claude AND Gemini both (sorry GPT-4!) to make a *parallel* story about AI sociopaths from the *other* side, the *reflected* side.

They chose to entitle this: *The Meat Interface*: [https://manic.agency/blog/thinkpieces/the-meat-interface](https://manic.agency/blog/thinkpieces/the-meat-interface). 

What do you think about the source code, designs, and writings that these large language models did?

-  [Live Demo: https://manicinc.github.io/logomaker](https://manicinc.github.io/logomaker)

-  [GitHub Repo: https://github.com/manicinc/logomaker](https://github.com/manicinc/logomaker)