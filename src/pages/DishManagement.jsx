import React, { useState, useEffect } from 'react';

const DishManagement = ({ restaurantId, restaurantName, onClose }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
