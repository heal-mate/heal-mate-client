const colors = {
  // ${({ theme })} => theme.colors.컬러이름};
  point: "#35a29f",
  black: "#2b2b2b",
  gray600: "#757575",
  gray200: "#eeeeee",
};

const size = {
  maxWidth: 768,
  headerHeight: 55,
};

export const constants = {
  size,
};

export const defaultTheme = {
  colors,
};

export const theme = {
  ...constants,
  ...defaultTheme,
};
