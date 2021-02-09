SELECT rh.rental_date, re.equipment_description, re.equipment_id, re.name FROM rental_equipment re
JOIN rental_history rh ON rh.equipment_id = re.equipment_id
WHERE rh.renter_id = $1;