import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function IntroHeading({ ...siteConfig }) {
  return (
    <div className="intro-content">
      <div className="intro-heading">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p
          className="hero__subtitle"
          dangerouslySetInnerHTML={{ __html: siteConfig.tagline }}
        ></p>
        <div className={styles.buttons}>
          <Link
            className={classnames(styles.getStarted)}
            to={useBaseUrl('docs/installation')}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

function IntroDescription() {
  return (
    <div className="intro-description">
      <ul>
        <li>
          <p>
            <pre>style-lib</pre> adds a library to your Nx monorepo
          </p>
        </li>
      </ul>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="style-lib official documentation site"
    >
      <header className="home-intro home-container">
        <IntroHeading {...siteConfig} />
        <IntroDescription />
      </header>
      <main>
        <p>main</p>
      </main>
    </Layout>
  );
}

export default Home;
