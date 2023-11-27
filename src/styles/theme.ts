const colors = {
  // ${({ theme })} => theme.colors.컬러이름};
  point: "#35a29f",
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
