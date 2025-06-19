const db =require ('../config/db')

function normalizeDateOnly(value) {
  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date)) return null;

  // Always returns YYYY-MM-DD in system's local timezone
  return date.toLocaleDateString('en-CA'); // '2025-06-20'
}


async function logIfChanged({ field, oldValue, newValue, taskId, userId, userName }) {
  const isDateField = field === 'due_date';

  const normalizedOld = isDateField
    ? normalizeDateOnly(oldValue)
    : oldValue;

  const normalizedNew = isDateField
    ? normalizeDateOnly(newValue)
    : newValue;

  if (normalizedOld !== normalizedNew) {
    const label = field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const actionType = `${field}_changed`;

    const logQuery = `
      INSERT INTO activity_logs_tbl (
        task_id, sub_task_id, user_id, user_name, action_type,
        old_value, new_value, updated_by, created_at
      )
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, NOW())`;

    await db.query(logQuery, [
      taskId,
      userId,
      userName,
      actionType,
      normalizedOld,
      normalizedNew,
      `${userName} changed ${label} from ${normalizedOld} to ${normalizedNew}`
    ]);
  }
  console.log('[due_date check]', {
  oldRaw: oldValue,
  newRaw: newValue,
  normalizedOld,
  normalizedNew
});
}


async function logTaskFieldChanges({ taskId, userId, userName, oldData, newData }) {
    const trackedFields = ['status', 'assignee', 'due_date', 'priority'];

    for (const field of trackedFields) {
        await logIfChanged({
            field,
            oldValue: oldData[field],
            newValue: newData[field],
            taskId,
            userId,
            userName
        });
    }
}

module.exports = {logIfChanged,logTaskFieldChanges};