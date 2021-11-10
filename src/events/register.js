export { default as clickBuy } from 'events/handlers/click-buy';
export { default as clickCard } from 'events/handlers/click-card';
export { default as clickContinue } from 'events/handlers/click-continue';
export { default as clickHeal } from 'events/handlers/click-heal';
export { default as clickRestart } from 'events/handlers/click-restart';
export { default as clickStart } from 'events/handlers/click-start';
export { default as clickTake } from 'events/handlers/click-take';
export { default as customCreatureUpdate } from 'events/handlers/custom-creature-update';
export { default as customEnterShop } from 'events/handlers/custom-enter-shop';
export { default as customPlayerAction } from 'events/handlers/custom-player-action';
export { default as customPlayerUpdateHand } from 'events/handlers/custom-player-update-hand';
export { default as customPlayerUpdateStats } from 'events/handlers/custom-player-update-stats';
export { default as customTick } from 'events/handlers/custom-tick';
export { default as customTickSegment } from 'events/handlers/custom-tick-segment';

export default function register() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Events Registered');
  }
}
