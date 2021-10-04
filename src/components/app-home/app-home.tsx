import { Component, h } from '@stencil/core';
import polyglot from '../../utils/localize';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p>
          {polyglot.t("welcome")} {polyglot.t("usage")} {polyglot.t("docs_pre")} {' '}
          <a href="https://stenciljs.com">stenciljs.com</a> {polyglot.t("docs_post")}
        </p>
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
