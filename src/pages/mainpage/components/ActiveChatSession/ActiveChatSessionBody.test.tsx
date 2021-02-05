// this is mostly an integration test,  this Container bases its behaviors on childrens
// although we are already testing children behaviors, it is good to test the logic on this Container
// lets forget about DRY and make sure that both Container and Children does respect their behavior

// expect when ActiveChatSession has a textMessage it renders the textMesage
// expect when ActiveChatSession doesn't have a textMessage but does have inlineButtons they render
// LATER : expect when ActiveChatSession has a textMessage or a file it renders the textMesage
// LATER : expect when ActiveChatSession has an audio it renders the Audio
