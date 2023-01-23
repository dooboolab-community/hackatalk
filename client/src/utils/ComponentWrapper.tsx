import type {ComponentType, ReactElement} from 'react';

import React from 'react';

/**
 * Helper class to nest multiple react components
 * without introducing indentation hell.
 */
class ComponentWrapper {
  private intermediate: ComponentType;

  constructor(SourceComponent: ComponentType) {
    this.intermediate = SourceComponent;
  }

  /**
   * Add another parent component to this.
   * @param WrapperComponent Outer component.
   * @param props Default props for wrapper component.
   * @returns this. For method chaining.
   */
  wrap<P>(
    WrapperComponent: ComponentType<P & {children: ReactElement}>,
    props: P,
  ): ComponentWrapper {
    const Inner = this.intermediate;

    const Next = (): ReactElement => (
      <WrapperComponent {...props}>
        <Inner />
      </WrapperComponent>
    );

    this.intermediate = Next;

    return this;
  }

  /**
   * Return the wrapped (nested) component.
   */
  build(): ComponentType {
    return this.intermediate;
  }
}

export default ComponentWrapper;
