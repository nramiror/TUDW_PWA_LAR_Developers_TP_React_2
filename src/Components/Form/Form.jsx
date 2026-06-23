import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Title from '../Title/Title';
import { useTranslation } from 'react-i18next';


const defaultFormData = {
    imageURL: '',
    name: '',
    category: '',
    description: ''
};

const normalizeFormData = (data) => ({
    ...defaultFormData,
    ...(data || {})
});

const Form = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(() => normalizeFormData(initialData));
    const isEditing = Boolean(initialData?.id);
    const { t } = useTranslation();

    useEffect(() => {
        setFormData(normalizeFormData(initialData));
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="mx-auto w-full max-w-2xl p-6">
            <Title level={3} className="mb-6 text-center">
                {isEditing ? t('form.titleEdit') : t('form.titleNew')}
            </Title>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                { }
                <div className="flex flex-col gap-2 text-left">
                    { }
                    <label htmlFor="name" className="text-sm font-semibold text-neutral-700">{t('form.labelName')}</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('form.placeholderName')}

                        className="w-full rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all font-comfortaa"
                    />
                </div>

                { }
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="imageURL" className="text-sm font-semibold text-neutral-700">{t('form.labelImage')}</label>
                    <input
                        id="imageURL"
                        type="url"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        required
                        placeholder={t('form.placeholderImage')}
                        className="w-full rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all"
                    />
                </div>

                { }
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="category" className="text-sm font-semibold text-neutral-700">{t('form.labelCategory')}</label>
                    <input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        placeholder={t('form.placeholderCategory')}
                        className="w-full rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all font-comfortaa"
                    />
                </div>

                { }
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="description" className="text-sm font-semibold text-neutral-700">{t('form.labelDescription')}</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder={t('form.placeholderDescription')}
                        className="w-full rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all resize-none font-comfortaa"
                    />
                </div>

                { }
                { }
                <div className="mt-4 flex items-center justify-end gap-3 border-t border-neutral-200 pt-5">
                    <Button text={t('form.btnCancel')} variant="grey" onClick={onCancel} />
                    <Button text={t('form.btnSave')} variant="blue" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default Form;