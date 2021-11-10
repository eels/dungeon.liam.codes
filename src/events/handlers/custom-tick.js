import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import processCreatureAttack from 'functions/process-creature-attack';
import processCreatureDeath from 'functions/process-creature-death';
import processCreatureStatusEffects from 'functions/process-creature-status-effects';
import processPlayerDeath from 'functions/process-player-death';
import processPlayerStatusEffects from 'functions/process-player-status-effects';
import resetTimer from 'functions/reset-timer';
import { TICK } from 'events/events';

bind(TICK, 'body', function () {
  const creature = Dungeon.creatures[0];

  processCreatureStatusEffects();

  if (creature.hp === 0) {
    processCreatureDeath();
  }

  processPlayerStatusEffects();
  processCreatureAttack();

  if (Player.hp === 0) {
    processPlayerDeath();
  }

  resetTimer();

  Player.setState({ actionTaken: false }).commit();
  document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
});

export default true;
