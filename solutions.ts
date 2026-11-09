const multiplyValue = (value: number, multiplier?: number): number => {
  return value * (multiplier !== undefined ? multiplier : 2);
};

const processInput = (value: number | string | boolean): number | string => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }
  if (typeof value === "number") {
    return value * 10;
  }
  return value ? "Active" : "Inactive";
};

const formatCoordinate = (
  coordinate: readonly [number, number, string],
): string => {
  const [latitude, longitude, locationName] = coordinate;
  return `Location: ${locationName} (${latitude}, ${longitude})`;
};

const concatenateArrays = <T>(...arrays: T[][]): T[] => {
  return arrays.reduce(
    (combined, currentArray) => combined.concat(currentArray),
    [],
  );
};

interface ICourse {
  title: string;
  students: number;
  isPublished: boolean;
}

const getPopularCourses = (
  courses: ICourse[],
  minStudents: number,
): ICourse[] => {
  return courses.filter(
    (course) => course.isPublished && course.students >= minStudents,
  );
};
