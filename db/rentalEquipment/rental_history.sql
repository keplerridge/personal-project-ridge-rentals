SELECT rh.rental_date, re.equipment_picture, re.equipment_description FROM rental_equipment re
JOIN rental_history rh ON rh.equipment_id = re.equipment_id
WHERE rh.renter_id = $1;