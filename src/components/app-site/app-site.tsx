import { Component, State } from '@stencil/core';
// import Pusher from 'pusher-js';
declare var Pusher: any

@Component({
  tag: 'app-site',
  styleUrl: 'app-site.scss'
})
export class AppSite {
 
  @State() finished = false;
  @State() scores: Score = {
    arsenal: 0,
    chelsea: 0
  }

  componentDidLoad() {
    console.log('cs')
    var pusher = new Pusher('7782664f2763f64d8da6', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('soccer');
    channel.bind('scores', (data) => {
      // console.log(data)
      if(data === 'Match End') {
        console.log(data)
        this.finished = true;
        return;
      }
      this.scores = {...this.scores, ...data};
      console.log(this.scores);
    });
  }

  render() {
    console.log(this.scores);
    return (
      <div class="hero is-info is-fullheight">
        <div class="hero-body">
          <div class="container ">
            {this.finished && <h1 class="has-text-centered title">Game Over!!!</h1>}
            <div class="level">
              <div class="level-item has-text-centered" />
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-1">{this.scores.arsenal}</p>
                  <p class="title">Arsenal</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-1">:</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-1">{this.scores.chelsea}</p>
                  <p class="title">Chelsea</p>
                </div>
              </div>
              <div class="level-item has-text-centered" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface Score {
  arsenal: number;
  chelsea: number;
}