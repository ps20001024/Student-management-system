# Project notes for IGNOU BCA report

## Main actors
- Administrator: manages courses, student accounts, attendance and results.
- Student: signs in and views their own profile, attendance and published results.

## Main collections
- `users`: login identity, hashed password, role and optional student reference.
- `students`: enrollment and personal/academic details, including a course reference.
- `courses`: course code, name, description, duration and status.
- `attendances`: student reference, course reference, date and status.
- `results`: student/course references, subject, exam and marks.

## Relationship summary
- One course can be associated with many students.
- One student can have many attendance records.
- One student can have many result records.
- A student login user is linked to one student profile.

In MongoDB these links are stored as ObjectId references; they are not SQL foreign-key constraints. Update the report diagrams if the implementation is changed.
