---
title: API
updated: 2026-03-14
layout: /main.njk
description: Using the Nekoweb API
---
## API
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*

## Disclaimer

This guide assumes the reader has some knowledge of JS and perhaps some experience with fetching even though it's been written with the intention of being able to be understood by anyone.

## Overview

An <span class="help" title="Application Programming Interface">API</span> allows you to interact with a server programmatically through its exposed endpoints. Some of these endpoints require an API key which is a unique set of characters that allows the server to confirm that it's talking to you. The API also has rate-limits which limit the amount of requests you can make to the server. At the moment it's 20 requests for free accounts and 2x-3x more for premium accounts, the limit resets every fifteen minutes. The majority of this will be a more extensive detailing of [Nekoweb's API Documentation](https://nekoweb.org/api) as well as ideas of what you might want to do with it.