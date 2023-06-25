import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

export default function ParticleEffect({ numParticles, colors, speed }) {
  const particles = useRef([]);

  useEffect(() => {
    particles.current.forEach((particle, index) => {
      const animateParticle = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.positionY, {
              toValue: containerHeight,
              duration: speed,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(particle.positionY, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start(() => animateParticle());
      };

      animateParticle();
    });

    return () => {
      particles.current.forEach((particle) => {
        particle.positionY.removeAllListeners();
      });
    };
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const renderParticles = () => {
    return particles.current.map((particle, index) => {
      const particleStyle = {
        ...styles.particle,
        backgroundColor: getRandomColor(),
        transform: [
          {
            translateY: particle.positionY,
          },
        ],
      };

      return <Animated.View key={index} style={particleStyle} />;
    });
  };

  useEffect(() => {
    particles.current = Array(numParticles)
      .fill()
      .map(() => ({
        positionY: new Animated.Value(0),
      }));
  }, [numParticles]);

  return (
    <View style={[styles.container]}>
      {renderParticles()}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
