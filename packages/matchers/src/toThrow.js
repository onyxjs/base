export default function toThrow(a, b) {
  try {
    a();
  } catch (e) {
    if (e.message == b) return true;
  }
  return false;
}
