-- Seed default transaction categories for church finance

-- Income categories
INSERT INTO transaction_categories (name, type, description) VALUES
('Tithe', 'income', 'Regular tithe contributions from members'),
('Offering', 'income', 'General offerings during services'),
('Special Offering', 'income', 'Special collections for specific purposes'),
('Donations', 'income', 'General donations from members and visitors'),
('Fundraising', 'income', 'Income from church fundraising events'),
('Rental Income', 'income', 'Income from renting church facilities'),
('Investment Income', 'income', 'Returns from church investments'),
('Grants', 'income', 'Grants received from organizations'),
('Other Income', 'income', 'Miscellaneous income sources');

-- Expense categories
INSERT INTO transaction_categories (name, type, description) VALUES
('Utilities', 'expense', 'Electricity, water, gas, internet, phone bills'),
('Maintenance', 'expense', 'Building and equipment maintenance costs'),
('Staff Salaries', 'expense', 'Salaries and wages for church staff'),
('Ministry Expenses', 'expense', 'Costs related to various ministry activities'),
('Office Supplies', 'expense', 'Stationery, printing, and office materials'),
('Insurance', 'expense', 'Property, liability, and other insurance costs'),
('Missions', 'expense', 'Support for missionary work and outreach'),
('Events', 'expense', 'Costs for church events and activities'),
('Equipment', 'expense', 'Purchase of church equipment and technology'),
('Transportation', 'expense', 'Vehicle maintenance, fuel, and travel costs'),
('Professional Services', 'expense', 'Legal, accounting, and consulting fees'),
('Charity', 'expense', 'Charitable giving and community support'),
('Other Expenses', 'expense', 'Miscellaneous operational expenses');
