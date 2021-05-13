/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const features = [
  {
    title: <>StackShare</>,
    imageUrl: 'img/svg_hackatalk1.svg',
    description: (
      <>
        We want to foster a culture that nutures code sharing and collaboration.
        We would like to share our development stacks with all of you out there and grow together.
      </>
    ),
  },
  {
    title: <>Grow Together</>,
    imageUrl: 'img/svg_hackatalk2.svg',
    description: (
      <>
        We believe that communication is essential for efficient teamwork and 
        group development. Feel free to share your ideas with us!
      </>
    ),
  },
  {
    title: <>Powered by dooboo-ui</>,
    imageUrl: 'img/svg_hackatalk3.svg',
    description: (
      <>
        Our project heavily depends on <a href="https://github.com/dooboolab/dooboo-ui">dooboo-ui</a>,
        another open source project we are currently working on.
        By participating in Halkatalk, you will learn to work with various opensource projects and
        help foster an open-source culture.
      </>
    ),
  },
];

function Feature({key, imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div key={key} className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('/docs/development/contributing')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
