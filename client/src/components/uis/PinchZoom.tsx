import {
  Animated,
  NativeMethods,
  NativeTouchEvent,
  PanResponder,
  PanResponderInstance,
  ViewStyle,
} from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type Props = PropsWithChildren<{
  style?: ViewStyle;
  onScaleChanged?(value: number): void;
  onTranslateChanged?(valueXY: {x: number; y: number}): void;
  onRelease?(): void;
  allowEmpty?: {x?: boolean; y?: boolean};
  fixOverflowAfterRelease?: boolean;
}>;

export interface PinchZoomRef {
  animatedValue: {scale: Animated.Value; translate: Animated.ValueXY};
  setValues(_: {scale?: number; translate?: {x: number; y: number}}): void;
}

type TouchePosition = Pick<
  NativeTouchEvent,
  'locationX' | 'locationY' | 'pageX' | 'pageY'
>;

function getDistanceFromTouches(touches: NativeTouchEvent[]): number {
  const [touch1, touch2] = touches;

  return Math.sqrt(
    (touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2,
  );
}

function getRelativeTouchesCenterPosition(
  touches: NativeTouchEvent[],
  layout: {width: number; height: number; pageX: number; pageY: number},
  transformCache: {scale: number; translateX: number; translateY: number},
): TouchePosition {
  const pageX =
    (touches[0].pageX + touches[1].pageX) / 2 - layout.width / 2 - layout.pageX;

  const pageY =
    (touches[0].pageY + touches[1].pageY) / 2 -
    layout.height / 2 -
    layout.pageY;

  return {
    locationX: (pageX - transformCache.translateX) / transformCache.scale,
    locationY: (pageY - transformCache.translateY) / transformCache.scale,
    pageX,
    pageY,
  };
}

function PinchZoom(props: Props, ref: Ref<PinchZoomRef>): ReactElement {
  const {
    style,
    children,
    onScaleChanged,
    onRelease,
    onTranslateChanged,
    allowEmpty,
    fixOverflowAfterRelease = true,
  } = props;

  const containerView = useRef<NativeMethods>();
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const transformCache = useRef({
    scale: 1,
    translateX: 0,
    translateY: 0,
  }).current;

  const lastTransform = useRef({scale: 1, translateX: 0, translateY: 0});
  const initialDistance = useRef<number>();
  const initialTouchesCenter = useRef<TouchePosition>();

  const layout = useRef<{
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();

  const decayingTranslateAnimation = useRef<Animated.CompositeAnimation>();
  const isResponderActive = useRef(false);
  const movingVelocity = useRef<{x: number; y: number}>();

  containerView.current?.measure((x, y, width, height, pageX, pageY) => {
    layout.current = {width, height, pageX, pageY};
  });

  useEffect(() => {
    scale.addListener(({value}) => {
      transformCache.scale = value;
      onScaleChanged && onScaleChanged(value);
    });

    const id = translate.addListener(({x, y}) => {
      if (
        decayingTranslateAnimation.current &&
        layout.current &&
        !isResponderActive.current
      ) {
        const overflowX =
          Math.abs(x) > ((transformCache.scale - 1) * layout.current.width) / 2;

        const overflowY =
          Math.abs(y) >
          ((transformCache.scale - 1) * layout.current.height) / 2;

        if (overflowX || overflowY) {
          decayingTranslateAnimation.current?.stop();
          decayingTranslateAnimation.current = undefined;

          translate.setValue({
            x: overflowX
              ? (Math.sign(x) *
                  (transformCache.scale - 1) *
                  layout.current.width) /
                2
              : x,
            y: overflowY
              ? (Math.sign(y) *
                  (transformCache.scale - 1) *
                  layout.current.height) /
                2
              : y,
          });
        }
      }

      transformCache.translateX = x;
      transformCache.translateY = y;
      onTranslateChanged && onTranslateChanged({x, y});
    });

    return () => {
      scale.removeAllListeners();
      translate.removeListener(id);
    };
  }, [onScaleChanged, onTranslateChanged, scale, transformCache, translate]);

  const [panResponder, setPanResponder] = useState<PanResponderInstance>();

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: ({nativeEvent}) => {
          isResponderActive.current = true;

          if (decayingTranslateAnimation.current)
            decayingTranslateAnimation.current.stop();

          const {touches} = nativeEvent;

          lastTransform.current = {...transformCache};

          initialDistance.current = undefined;

          if (layout.current != null)
            if (touches.length === 2) {
              initialDistance.current = getDistanceFromTouches(touches);

              initialTouchesCenter.current = getRelativeTouchesCenterPosition(
                touches,
                layout.current,
                transformCache,
              );
            } else initialDistance.current = undefined;
        },
        onPanResponderMove: ({nativeEvent}, gestureState) => {
          const {touches} = nativeEvent;

          if (layout.current == null) return;

          if (movingVelocity.current)
            movingVelocity.current = {
              x: (movingVelocity.current.x + gestureState.vx) / 2,
              y: (movingVelocity.current.y + gestureState.vy) / 2,
            };
          else
            movingVelocity.current = {x: gestureState.vx, y: gestureState.vy};

          if (touches.length === 2)
            if (
              initialDistance.current &&
              initialTouchesCenter.current &&
              layout.current
            ) {
              const newScale = Math.max(
                1,
                (getDistanceFromTouches(touches) / initialDistance.current) *
                  lastTransform.current.scale,
              );

              const {pageX, pageY} = getRelativeTouchesCenterPosition(
                touches,
                layout.current,
                transformCache,
              );

              scale.setValue(newScale);

              const newTranslateX =
                pageX - initialTouchesCenter.current.locationX * newScale;

              const newTranslateY =
                pageY - initialTouchesCenter.current.locationY * newScale;

              translate.setValue({
                x: allowEmpty?.x
                  ? Math.min(
                      Math.abs(newTranslateX),
                      ((newScale - 1) * layout.current.width) / 2,
                    ) * Math.sign(newTranslateX)
                  : newTranslateX,
                y: allowEmpty?.y
                  ? Math.min(
                      Math.abs(newTranslateY),
                      ((newScale - 1) * layout.current.height) / 2,
                    ) * Math.sign(newTranslateY)
                  : newTranslateY,
              });
            } else {
              initialDistance.current = getDistanceFromTouches(touches);

              initialTouchesCenter.current = getRelativeTouchesCenterPosition(
                touches,
                layout.current,
                transformCache,
              );
            }
          else if (touches.length === 1) {
            if (initialDistance.current) return;

            const newTranslateX =
              lastTransform.current.translateX + gestureState.dx;

            const newTranslateY =
              lastTransform.current.translateY + gestureState.dy;

            translate.setValue({
              x: newTranslateX,
              y: newTranslateY,
            });
          }
        },
        onPanResponderRelease: () => {
          isResponderActive.current = false;

          if (layout.current == null) return;

          const overflowX =
            Math.abs(transformCache.translateX) >
            ((transformCache.scale - 1) * layout.current.width) / 2;

          const overflowY =
            Math.abs(transformCache.translateY) >
            ((transformCache.scale - 1) * layout.current.height) / 2;

          if (overflowX || overflowY) {
            if (!fixOverflowAfterRelease) {
              onRelease && onRelease();

              return;
            }

            decayingTranslateAnimation.current?.stop();
            decayingTranslateAnimation.current = undefined;

            const toValue = {
              x: overflowX
                ? (Math.sign(transformCache.translateX) *
                    (transformCache.scale - 1) *
                    layout.current.width) /
                  2
                : transformCache.translateX,
              y: overflowY
                ? (Math.sign(transformCache.translateY) *
                    (transformCache.scale - 1) *
                    layout.current.height) /
                  2
                : transformCache.translateY,
            };

            Animated.timing(translate, {
              toValue,
              duration: 100,
              useNativeDriver: true,
            }).start();
          } else {
            decayingTranslateAnimation.current = Animated.decay(translate, {
              velocity: movingVelocity.current ?? {x: 0, y: 0},
              useNativeDriver: true,
            });

            decayingTranslateAnimation.current.start(() => {
              decayingTranslateAnimation.current = undefined;
              onRelease && onRelease();
            });
          }
        },
      }),
    );
  }, [
    fixOverflowAfterRelease,
    onRelease,
    allowEmpty?.x,
    allowEmpty?.y,
    scale,
    transformCache,
    translate,
  ]);

  useImperativeHandle(ref, () => ({
    animatedValue: {scale, translate},
    setValues: (values) => {
      values.scale != null && scale.setValue(values.scale);
      values.translate != null && translate.setValue(values.translate);
    },
  }));

  return (
    <Animated.View
      testID="PINCH_ZOOM_CONTAINER"
      ref={(pinchViewRef: NativeMethods | undefined) => {
        containerView.current = pinchViewRef;
      }}
      style={[
        style,
        style?.transform
          ? {}
          : {
              transform: [
                {translateX: translate.x},
                {translateY: translate.y},
                {scale},
              ],
            },
      ]}
      {...(panResponder?.panHandlers || {})}>
      {children}
    </Animated.View>
  );
}

export default forwardRef<PinchZoomRef, Props>(PinchZoom);
