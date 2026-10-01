export function getWeatherCondition(code) {
  if (code === 0) {
    return {
      description: "Clear Sky",
      icon: "☀️",
    };
  }

  if (code === 1) {
    return {
      description: "Mainly Clear",
      icon: "🌤️",
    };
  }

  if (code === 2) {
    return {
      description: "Partly Cloudy",
      icon: "⛅",
    };
  }

  if (code === 3) {
    return {
      description: "Overcast",
      icon: "☁️",
    };
  }

  if (code >= 45 && code <= 48) {
    return {
      description: "Foggy",
      icon: "🌫️",
    };
  }

  if (code >= 51 && code <= 57) {
    return {
      description: "Drizzle",
      icon: "🌦️",
    };
  }

  if (code >= 61 && code <= 67) {
    return {
      description: "Rain",
      icon: "🌧️",
    };
  }

  if (code >= 71 && code <= 77) {
    return {
      description: "Snow",
      icon: "❄️",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      description: "Rain Showers",
      icon: "🌦️",
    };
  }

  if (code >= 95 && code <= 99) {
    return {
      description: "Thunderstorm",
      icon: "⛈️",
    };
  }

  return {
    description: "Unknown",
    icon: "🌡️",
  };
}